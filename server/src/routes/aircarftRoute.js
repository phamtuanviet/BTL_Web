import express from "express"
import * as aircraftController from "../controllers/aircraftController.js"

export const aircraftRoute = express.Router()

aircraftRoute.get("/get-aircrafts-by-search",aircraftController.getAircraftsBySearch)
aircraftRoute.get("/get-all-aircrafts", aircraftController.getAircrafts);
aircraftRoute.get("/search-aircrafts-in-flight/:q", aircraftController.searchAircraftsInFlight);
aircraftRoute.get("/:id", aircraftController.getAircraft);
aircraftRoute.post("/", aircraftController.createNewAircraft);
aircraftRoute.put("/:id", aircraftController.updateExistingAircraft);
aircraftRoute.delete("/:id", aircraftController.deleteExistingAircraft);
