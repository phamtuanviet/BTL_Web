import cron from "node-cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const startFlightStatusCron = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();

    await prisma.flight.updateMany({
      where: {
        OR: [
          { status: "SCHEDULED", departureTime: { lte: now } },
          { status: "DELAYED", estimatedDeparture: { lte: now } },
        ],
      },
      data: { status: "DEPARTED" },
    });

    const flights = await prisma.flight.findMany({
      where: { status: "DEPARTED" },
    });

    for (const flight of flights) {
      const arrivalCheckTime = flight.estimatedArrival ?? flight.arrivalTime;

      if (arrivalCheckTime && arrivalCheckTime <= now) {
        await prisma.flight.update({
          where: { id: flight.id },
          data: { status: "ARRIVED" },
        });
      }
    }

    console.log(`[CRON] Flight status updated at ${now.toISOString()}`);
  });
};
