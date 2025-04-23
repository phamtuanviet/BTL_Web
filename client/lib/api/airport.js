// services/api/airport.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/airport";

const airportApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor xử lý lỗi chung
airportApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const airportService = {
  getAllAirports: async () => {
    try {
      return await airportApi.get("/get-all-airports");
    } catch (error) {
      throw error;
    }
  },

  getAirportById: async (id) => {
    try {
      return await airportApi.get(`/get/${id}`);
    } catch (error) {
      throw error;
    }
  },

  searchAirports: async (searchTerm) => {
    try {
      return await airportApi.get(`/search-airports/${searchTerm}`);
    } catch (error) {
      throw error;
    }
  },

  searchAirportsInFlight: async (searchTerm, { signal } = {}) => {
    try {
      return await airportApi.get(`/search-airports-in-flight/${searchTerm}`, {
        signal,
      });
    } catch (error) {
      throw error;
    }
  },

  createNewAirport: async (airportData) => {
    try {
      return await airportApi.post("/create", airportData);
    } catch (error) {
      throw error;
    }
  },

  updateAirport: async (id, updateData) => {
    try {
      return await airportApi.put(`/update/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  deleteAirport: async (id) => {
    try {
      return await airportApi.delete(`/delete/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default airportService;
