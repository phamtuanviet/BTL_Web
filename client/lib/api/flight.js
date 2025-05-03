import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/flight";

const flightApi = axios.create({
  baseURL: API_BASE_URL,
});

flightApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const flightService = {
  getAllflight: async () => {
    try {
      return await flightApi.get("/");
    } catch (error) {
      throw error;
    }
  },

  getLatestflight: async (skip = 0, take = 5) => {
    try {
      return await flightApi.get("/get-last", {
        params: {
          skip,
          take,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  },
  searchFlightsInTicket: async (searchTerm, { signal } = {}) => {
    try {
      return await flightApi.get(`/search-flights-in-ticket/${searchTerm}`, {
        signal,
      });
    } catch (error) {
      throw error;
    }
  },

  // searchFlightsInTicket

  getFlightsBySearch: async (page, pageSize = 10, query, sortBy, sortOrder) => {
    try {
      const data = await flightApi.get(`/get-flights-by-search`, {
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

  getFlightById: async (id) => {
    try {
      return await flightApi.get(`/${id}`);
    } catch (error) {
      throw error;
    }
  },

  filterFlights: async (filterData) => {
    try {
      filterData.page = filterData?.page || 1;
      filterData.pageSize = filterData?.pageSize || 10;
      return await flightApi.get("/filter", {
        params: filterData,
      });
    } catch (error) {
      throw error;
    }
  },


  searchFlightsByUser: async (searchData) => {
    try {
      return await flightApi.get("/search-flights-by-user", {
        params: searchData,
      });
    } catch (error) {
      throw error;
    }
  },
  
  createFlight: async (flightData) => {
    try {
      return await flightApi.post("/", flightData);
    } catch (error) {
      throw error;
    }
  },

  updateFlight: async (id, updateData) => {
    try {
      return await flightApi.put(`/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  deleteFlight: async (id) => {
    try {
      const data = await flightApi.delete(`/${id}`);
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
};

export default flightService;
