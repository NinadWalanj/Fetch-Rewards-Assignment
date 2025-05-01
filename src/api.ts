import axios from 'axios';
import qs from "qs";

export const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,  // HttpOnly cookie
  paramsSerializer: {
    // serialize arrays as repeated params
    serialize: params => qs.stringify(params, { arrayFormat: 'repeat' }),
  },
});
