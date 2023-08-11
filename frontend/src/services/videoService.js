import { BASE_API_URL } from "@/lib/config";
import axios from "axios";

export const getVideos = async ({ sortField, page, limit, query }) => {
  try {
    const configs = {
      params: {
        sort_by: sortField,
        page,
        limit,
      },
    };

    if (query) {
      configs.params.query = query;
    }

    const { data } = await axios.get(`${BASE_API_URL}/videos`, configs);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getVideoById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/videos/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateVideoViews = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/videos/${id}/play`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateVideoLikes = async (videoId) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/videos/${videoId}/like`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProducts = async (videoId) => {
  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/videos/${videoId}/products`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
