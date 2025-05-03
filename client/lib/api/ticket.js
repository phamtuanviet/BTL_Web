import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/ticket";

const ticketApi = axios.create({
  baseURL: API_BASE_URL,
});

ticketApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const ticketService = {
  getAllTicket: async () => {
    try {
      return await ticketApi.get("/");
    } catch (error) {
      throw error;
    }
  },

  getLatestTicket: async (skip = 0, take = 5) => {
    try {
      return await ticketApi.get("/get-last", {
        params: {
          skip,
          take,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  },

  filterTickets: async (filterData) => {
    try {
      filterData.page = filterData?.page || 1;
      filterData.pageSize = filterData?.pageSize || 10;
      return await ticketApi.get("/filter", {
        params: filterData,
      });
    } catch (error) {
      throw error;
    }
  },

  getTicketsBySearch: async (page, pageSize = 10, query, sortBy, sortOrder) => {
    try {
      const data = await ticketApi.get(`/get-tickets-by-search`, {
        params: {
          page,
          pageSize,
          query,
          sortBy,
          sortOrder,
        },
      });
      return data;
    } catch (error) {
      toast.error(error.message);
    }
  },

  getTicketById: async (id) => {
    try {
      return await ticketApi.get(`/${id}`);
    } catch (error) {
      throw error;
    }
  },

  createTicket: async (ticketData) => {
    try {
      return await ticketApi.post("/", ticketData);
    } catch (error) {
      throw error;
    }
  },

  createTicketClient: async (ticketData) => {
    try {
      return await ticketApi.post("/ticket-client", ticketData, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  },

  updateTicket: async (id, updateData) => {
    try {
      return await ticketApi.put(`/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  cancelTicket: async (data) => {
    try {
      const res = await ticketApi.put(`/cancel`, data);
      toast.success("Cancel successfully");
      return res;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  },

  deleteTicket: async (id) => {
    try {
      const data = await ticketApi.delete(`/${id}`);
      toast.success("delete success");
      return data;
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        error ||
        "An error occurred";
      toast.error(msg);
      return null;
    }
  },
  lookUpTicket: async (search) => {
    try {
      const res = await ticketApi.get(`/look-up/${search}`);
      return res;
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  },
};

export default ticketService;
