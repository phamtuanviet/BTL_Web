import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRoute.js";
import userRouter from "./routes/useRoute.js";
import { airportRoute } from "./routes/airportRoute.js";
import { newsRoute } from "./routes/newsRoute.js";
import { aircraftRoute } from "./routes/aircraftRoute.js";
import { flightRoute } from "./routes/flightRoute.js";
import { startFlightStatusCron } from "./services/flightStatusCron.js";
import { flightSeatRoute } from "./routes/flightSeatRoute.js";
import { ticketRoute } from "./routes/ticketRoute.js";
import { revenueRoute } from "./routes/revenueRoute.js";



dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
startFlightStatusCron();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/airport', airportRoute);
app.use("/api/news",newsRoute)
app.use("/api/aircraft",aircraftRoute)
app.use("/api/flight",flightRoute)
app.use("/api/flight-seat",flightSeatRoute)
app.use("/api/ticket",ticketRoute)
app.use("/api/revenue", revenueRoute)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
