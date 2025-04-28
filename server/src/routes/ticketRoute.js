import express from "express"
import * as ticketController from "../controllers/ticketController.js"

export const ticketRoute = express.Router();

ticketRoute.get("/get-tickets-by-search", ticketController.getTicketsBySearch);
ticketRoute.get("/get-all-flight/:flightId", ticketController.getAllTicketsFromFlight);
ticketRoute.get("/filter", ticketController.filterTickets);
ticketRoute.get("/:id", ticketController.getTicketById);
ticketRoute.post("/", ticketController.createTicket);
ticketRoute.put("/:id", ticketController.cancelTicket);
ticketRoute.delete("/:id", ticketController.deleteTicket);