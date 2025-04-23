import { PassengerType, PrismaClient } from "@prisma/client";
import { findUserByEmail, findUserById } from "./userRepository.js";
import {
  getFlightSeatById,
  getFlightSeatBySeatClassAndFlight,
  updateBookedSeat,
} from "./flightSeatRepository.js";
import { getFlightByFlightNumber, getFlightById } from "./flightRepository.js";
import { generateBookingReference } from "../services/other.js";
const prisma = new PrismaClient();

export const getAllTicketsFromFlight = async (flightId) => {
  return await prisma.ticket.findMany({
    where: { flightId },
  });
};

export const getTicketById = async (id) => {
  return await prisma.ticket.findUnique({
    where: { id: Number(id) },
  });
};

export const createTicket = async (data) => {
  const flight = await getFlightByFlightNumber(data.flightNumber);
  console.log(flight);
  if (
    !flight ||
    !(flight.status === "SCHEDULED" || flight.status === "DELAYED")
  ) {
    throw new Error("Flight isn't existing or finished");
  }
  const user = findUserByEmail(data.passengerEmail);

  const flightSeat = await getFlightSeatBySeatClassAndFlight(
    flight.id,
    data.seatClass
  );
  if (!flightSeat) {
    throw new Error("Flight seat isn't existing");
  }
  const count = await prisma.ticket.count({
    where: {
      flightId: flight.id,
      flightSeatId: flightSeat.id,
    },
  });

  const seatNumber = `${flightSeat.seatClass.charAt(0).toUpperCase()}${count}`;
  const bookingReference = generateBookingReference(5);
  let ticketData = {
    flightId: flight.id,
    flightSeatId: flightSeat.id,
    bookedById: user?.id || undefined,
    discount: data?.discount || 0,
    passengerName: data.passengerName,
    passengerEmail: data.passengerEmail || undefined,
    passengerType: data.passengerType,
  };

  ticketData.seatNumber = seatNumber;
  ticketData.bookingReference = bookingReference;
  const createdTicket = await prisma.ticket.create({
    data: ticketData,
  });
  updateBookedSeat(flightSeat.id);
  return createdTicket;
};

export const getTicketsBySearch = async (
  page = 1,
  pageSize = 10,
  query = "",
  sortBy = "id",
  sortOrder = "asc"
) => {
  const searchCondition = query
    ? {
        OR: [
          {
            flight: {
              is: {
                OR: [
                  { flightNumber: { contains: query, mode: "insensitive" } },
                  {
                    departureAirport: {
                      is: {
                        name: { contains: query, mode: "insensitive" },
                      },
                    },
                    arrivalAirport: {
                      is: {
                        name: { contains: query, mode: "insensitive" },
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            bookedBy: {
              is: {
                OR: [{ name: { contains: query, mode: "insensitive" } }],
              },
            },
          },
          {
            passengerName: { contains: query, mode: "insensitive" },  
          },
          {
            passengerEmail: { contains: query, mode: "insensitive" },
          },
          {
            seatNumber: { contains: query, mode: "insensitive" },
          },
        ],
      }
    : {};

  const skip = (page - 1) * pageSize;

  let orderByOption;

  if (sortBy === "bookedBy") {
    orderByOption = {
      [sortBy]: {
        name: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
      },
    };
  } else if (sortBy === "flight") {
    orderByOption = {
      [sortBy]: {
        flightNumber: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
      },
    };
  } else if (sortBy === "flightSeat") {
    orderByOption = {
      [sortBy]: {
        seatClass: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
      },
    };
  } else {
    orderByOption = {
      [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc",
    };
  }

  const tickets = await prisma.ticket.findMany({
    where: searchCondition,
    skip,
    take: pageSize,
    orderBy: orderByOption,
    include: {
      flight: {
        select: {
          id: true,
          flightNumber: true,
          departureTime: true,
          estimatedDeparture: true,
          departureAirport: {
            select: {
              name: true,
            },
          },
          arrivalAirport: {
            select: {
              name: true,
            },
          },
        },
      },
      flightSeat: {},
      bookedBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const sanitize = (obj) => {
    const converted = { ...obj };
    for (const key in converted) {
      const val = converted[key];
      if (typeof converted[key] === "bigint") {
        converted[key] = converted[key].toString();
      }
      if (val instanceof Date) {
        converted[key] = val.toISOString();
      }
    }
    return converted;
  };

  const ticketsData = tickets.map((t) => {
    return sanitize(t);
  });

  const totalTickets = await prisma.ticket.count({
    where: searchCondition,
  });

  return {
    tickets: ticketsData,
    totalPages: Math.ceil(totalTickets / pageSize),
    currentPage: page,
  };
};

export const updateTicket = async (id, data) => {
  return await prisma.ticket.update({
    where: { id },
    data,
  });
};

export const cancelTicket = async (id) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id), isCancelled: false },
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  const currentTime = new Date();
  if (currentTime > ticket.cancellationDeadline) {
    throw new Error("Cancel time limit expired");
  }
  return await prisma.ticket.update({
    where: { id: Number(id) },
    data: {
      isCancelled: true,
    },
  });
};

export const deleteTicket = async (id) => {
  return await prisma.ticket.delete({
    where: { id: Number(id) },
  });
};
