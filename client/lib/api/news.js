import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/news";

const newsApi = axios.create({
  baseURL: API_BASE_URL,
});

newsApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error.response?.data.message || error.message);
  }
);

const newsService = {
  getAllNews: async () => {
    try {
      return await newsApi.get("/");
    } catch (error) {
      throw error;
    }
  },

  getLatestNews: async (skip = 0, take = 5) => {
    try {
      return await newsApi.get("/get-last", {
        params: {
          skip,
          take,
        },
      });
    } catch (error) {
      toast.error(error.message);
    }
  },

  getNewsBySearch: async (page, pageSize = 10, query, sortBy, sortOrder) => {
    try {
      const data = await newsApi.get(`/get-news-by-search`, {
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

  getNewsById: async (id) => {
    try {
      return await newsApi.get(`/${id}`);
    } catch (error) {
      throw error;
    }
  },

  createNews: async (newsData) => {
    try {
      return await newsApi.post("/", newsData);
    } catch (error) {
      throw error;
    }
  },

  updateNews: async (id, updateData) => {
    try {
      return await newsApi.put(`/${id}`, updateData);
    } catch (error) {
      throw error;
    }
  },

  filterNews: async (filterData) => {
    try {
      filterData.page = filterData?.page || 1;
      filterData.pageSize = filterData?.pageSize || 10;
      return await newsApi.get("/filter", {
        params: filterData,
      });
    } catch (error) {
      throw error;
    }
  },

  deleteNews: async (id) => {
    try {
      const data = await newsApi.delete(`/${id}`);
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

export default newsService;
