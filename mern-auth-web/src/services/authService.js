import axios from 'axios';

let accessToken = JSON.parse(localStorage.getItem('accessToken'));

export const getToken = () => accessToken;

export const setToken = (newToken) => {
  accessToken = newToken;
};

export const refreshToken = async () => {
  // try {
  //   const response = await axios.post('/refresh-token', {
  //     token: getToken(),
  //   });
  //   setToken(response.data.accessToken);
  //   return response.data.accessToken;
  // } catch (error) {
  //   console.error('Failed to refresh token:', error);
  //   throw error;
  // }
};
