// services/api/user.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

const userApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const userService = {
  getAllusers: async () => {
    try {
      return await userApi.get("/get-all-users");
    } catch (error) {
      throw error;
    }
  },

  getuserById: async (id) => {
    try {
      return await userApi.get(`/get/${id}`);
    } catch (error) {
      throw error;
    }
  },

  filterUsers: async (filterData) => {
    try {
      filterData.page = filterData?.page || 1;
      filterData.pageSize = filterData?.pageSize || 10;
      return await userApi.get("/filter", {
        params: filterData,
      });
    } catch (error) {
      throw error;
    }
  },

  getUserBySearch: async (page, pageSize = 10, query,sortBy,sortOrder) => {
    try {
      const data = await userApi.get(`/get-users-by-search`, {
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

  searchUsers: async (searchTerm) => {
    try {
      return await userApi.get(`/search-users/${searchTerm}`);
    } catch (error) {
      throw error;
    }
  },

  createNewuser: async (userData) => {
    try {
      return await userApi.post("/create", userData);
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, updateData) => {
    try {
      return await userApi.put(`/update/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  deleteuser: async (id) => {
    try {
      return await userApi.delete(`/delete/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
