// services.js
import axios from 'axios';

const getVideoDownloadUrl = async (url) => {
  const response = await axios.post('/api/download', { url });
  return response.data;
};

export default {
  getVideoDownloadUrl: getVideoDownloadUrl,
};
