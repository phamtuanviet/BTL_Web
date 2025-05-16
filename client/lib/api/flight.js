import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/flight";

const flightApi = axios.create({
  baseURL: API_BASE_URL,
});

flightApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

const flightService = {
  getAllflight: async () => {
    try {
      return await flightApi.get("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
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
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },
  searchFlightsInTicket: async (searchTerm, { signal } = {}) => {
    try {
      return await flightApi.get(`/search-flights-in-ticket/${searchTerm}`, {
        signal,
      });
    } catch (error) {
      if (error.message === "canceled") return;
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
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
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  getFlightById: async (id) => {
    try {
      return await flightApi.get(`/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
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
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  searchFlightsByUser: async (searchData) => {
    try {
      return await flightApi.get("/search-flights-by-user", {
        params: searchData,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  createFlight: async (flightData) => {
    try {
      return await flightApi.post("/", flightData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  updateFlight: async (id, updateData) => {
    try {
      return await flightApi.put(`/${id}`, updateData);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  deleteFlight: async (id) => {
    try {
      const data = await flightApi.delete(`/${id}`);
      toast.success("delete success");
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  countFlights: async () => {
    try {
      return await flightApi.get("/count-flights");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },

  countStatus: async () => {
    try {
      return await flightApi.get("/count-status");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return null;
    }
  },
};

export default flightService;
