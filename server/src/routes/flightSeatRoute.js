import express from "express"
import * as flightSeatController from "../controllers/flightSeatController.js"

export const flightSeatRoute = express.Router();

flightSeatRoute.get("/get-all-flight-seats", flightSeatController.getAllFlightSeats);
flightSeatRoute.get("/:id", flightSeatController.getFlightSeatById);
flightSeatRoute.post("/", flightSeatController.createFlightSeat);
flightSeatRoute.put("/:id", flightSeatController.updateFlightSeat);
flightSeatRoute.put("/booked/:id",flightSeatController.updateBookedSeat)
flightSeatRoute.delete("/:id", flightSeatController.deleteFlightSeat);