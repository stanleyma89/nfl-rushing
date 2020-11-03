import axios from 'axios';

const URL = 'http://localhost:3000'
const TIMEOUT = 10000

export const apiClient = axios.create({
  baseURL: URL,
  timeout: TIMEOUT
});

export const downloadApiClient = axios.create({
  baseURL: URL,
  responseType: 'blob',
  timeout: TIMEOUT
})
