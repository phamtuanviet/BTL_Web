import express from "express";
import * as ticketController from "../controllers/ticketController.js";

export const ticketRoute = express.Router();

ticketRoute.get("/get-tickets-by-search", ticketController.getTicketsBySearch);
ticketRoute.get("/count-all-ticket", ticketController.countAllTicket);
ticketRoute.get("/count-cancelled-ticket", ticketController.countCancelledTicket);
ticketRoute.get("/count-ticket-stats", ticketController.countTicketStats);
ticketRoute.get("/get-all-flight/:flightId",ticketController.getAllTicketsFromFlight);
ticketRoute.get("/look-up/:search",ticketController.lookUpTicket)
ticketRoute.get("/filter", ticketController.filterTickets);
ticketRoute.get("/:id", ticketController.getTicketById);
ticketRoute.post("/", ticketController.createTicket);
ticketRoute.post("/ticket-client", ticketController.handleTicketClientRequest);
ticketRoute.put("/cancel", ticketController.cancelTicket);
ticketRoute.delete("/:id", ticketController.deleteTicket);
