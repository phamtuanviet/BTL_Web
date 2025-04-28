// services/api/aircraft.js
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/aircraft";

const aircraftApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor xử lý lỗi chung
aircraftApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const aircraftService = {
  getAllAircrafts: async () => {
    try {
      return await aircraftApi.get("/get-all-aircrafts");
    } catch (error) {
      throw error;
    }
  },

  getAircraftById: async (id) => {
    try {
      return await aircraftApi.get(`/${id}`);
    } catch (error) {
      throw error;
    }
  },

  searchAircrafts: async (searchTerm) => {
    try {
      return await aircraftApi.get(`/search-aircrafts/${searchTerm}`);
    } catch (error) {
      throw error;
    }
  },
  searchAircraftsInFlight: async (searchTerm, { signal } = {}) => {
    try {
      return await aircraftApi.get(`/search-aircrafts-in-flight/${searchTerm}`, {
        signal,
      });
    } catch (error) {
      throw error;
    }
  },
  getAircraftsBySearch: async (
    page,
    pageSize = 10,
    query,
    sortBy,
    sortOrder
  ) => {
    try {
      const data = await aircraftApi.get(`/get-aircrafts-by-search`, {
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
      throw error;
    }
  },

  filterAircraft: async (filterData) => {
    try {
      filterData.page = filterData?.page || 1
      filterData.pageSize = filterData?.pageSize || 10
      return await aircraftApi.get("/filter", {
        params : filterData
      });
    } catch (error) {
      throw error;
    }
  },

  createNewAircraft: async (aircraftData) => {
    try {
      return await aircraftApi.post("/", aircraftData);
    } catch (error) {
      throw error;
    }
  },

  updateAircraft: async (id, updateData) => {
    try {
      return await aircraftApi.put(`/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  deleteAircraft: async (id) => {
    try {
      const data = await aircraftApi.delete(`/${id}`);
      toast.success("Delete success");
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

export default aircraftService;
