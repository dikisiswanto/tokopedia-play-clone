import axios from 'axios';

import { BASE_API_URL } from '@/lib/config';
import { generateUsername } from '@/lib/utils';

export const getComments = async (videoId) => {
  const { data } = await axios.get(`${BASE_API_URL}/videos/${videoId}/comments`);
  return data;
};

export const postComment = async ({ videoId, fullname, comment, avatar }) => {
  const username = generateUsername(fullname);
  const configs = {
    username,
    fullname,
    comment,
    videoId,
  };

  if (avatar) {
    configs.avatar = avatar;
  }

  const { data } = await axios.post(`${BASE_API_URL}/comments`, configs);
  return data;
};
