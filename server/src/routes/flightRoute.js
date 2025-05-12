import express from "express";
import * as flightController from "../controllers/flightController.js";

export const flightRoute = express.Router();

flightRoute.get("/search-flights-in-ticket/:q",flightController.searchFlightsInTicket)
flightRoute.get("/get-flights-by-search",flightController.getFlightsBySearch)
flightRoute.get("/filter",flightController.filterFlights)
flightRoute.get("/search-flights-by-user",flightController.searchFlightsForUser)
flightRoute.get("/get-all-flight", flightController.getAllFlights);
flightRoute.get("/count-flights", flightController.countFlights);
flightRoute.get("/count-status", flightController.countStatus);
flightRoute.get("/:id", flightController.getFlightById);
flightRoute.post("/", flightController.createFlight);
flightRoute.put("/:id", flightController.updateFlight);
flightRoute.delete("/:id", flightController.cancelFlight);
