import * as ticketRepository from "../repositories/ticketRepository.js";

export const getAllTicketsFromFlight = async (req, res) => {
  try {
    const fligthId = req.params.flightId;
    const tickets = await ticketRepository.getAllTicketsFromFlight(fligthId);
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await ticketRepository.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const { passengerName, passengerType, seatClass, flightNumber, passengerEmail } = req.body;

    if (!passengerName || !seatClass || !flightNumber || !passengerType || !passengerEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required field" });
    }
    const newTicket = await ticketRepository.createTicket(req.body);
    res.status(201).json({ success: true, data: newTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTicketsBySearch = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const query = req.query.query || "";
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder || "asc";

    const { tickets, totalPages, currentPage } =
      await ticketRepository.getTicketsBySearch(
        page,
        pageSize,
        query,
        sortBy,
        sortOrder
      );

    return res.json({
      success: true,
      data: {
        tickets,
        totalPages,
        currentPage,
      },
    });
  } catch (error) {
    console.error("Error in getPaginatedTickets:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const cancelTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const ticket = await ticketRepository.cancelTicket(id);
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const deleteTicket = await ticketRepository.delete(req.params.id);
    res.status(200).json({ success: true, data: deleteTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
