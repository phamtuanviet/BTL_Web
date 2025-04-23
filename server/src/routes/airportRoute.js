import express from "express";
import {
  getAirports,
  getAirport,
  createNewAirport,
  updateExistingAirport,
  deleteExistingAirport,
  searchAirport,
  searchAirportsInFlight,
} from "../controllers/airportController.js";

export const airportRoute = express.Router();

airportRoute.get("/get-all-airports", getAirports);
airportRoute.get("/get/:id", getAirport);
airportRoute.get("/search-airports/:q", searchAirport);
airportRoute.get("/search-airports-in-flight/:q", searchAirportsInFlight);
airportRoute.post("/create", createNewAirport);
airportRoute.put("/update/:id", updateExistingAirport);
airportRoute.delete("/delete/:id", deleteExistingAirport);
