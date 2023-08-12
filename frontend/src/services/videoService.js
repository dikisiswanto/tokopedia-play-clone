import axios from 'axios';

import { BASE_API_URL } from '@/lib/config';

export const getVideos = async ({ sortField, page, limit, query }) => {
  const allowedFields = ['createdAt', 'likes', 'title', 'views'];

  const configs = {
    params: {
      page,
      limit,
    },
  };

  if (allowedFields.includes(sortField)) {
    configs.params.sort_by = sortField;
  }

  if (query) {
    configs.params.query = query;
  }

  const { data } = await axios.get(`${BASE_API_URL}/videos`, configs);
  return data;
};

export const getVideoById = async (id) => {
  const { data } = await axios.get(`${BASE_API_URL}/videos/${id}`);
  return data;
};

export const updateVideoViews = async (id) => {
  const { data } = await axios.get(`${BASE_API_URL}/videos/${id}/play`);
  return data;
};

export const updateVideoLikes = async (videoId) => {
  const { data } = await axios.get(`${BASE_API_URL}/videos/${videoId}/like`);
  return data;
};

export const getProducts = async (videoId) => {
  const { data } = await axios.get(`${BASE_API_URL}/videos/${videoId}/products`);
  return data;
};
