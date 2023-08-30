import axios from "axios";

const apiInstance = axios.create({
  baseURL: 'https://cdn.contentstack.io',
  timeout: 1000,
  headers: {
    'api_key': process.env.API_KEY,
    'access_token': process.env.DELIVERY_TOKEN,
    'Content-Type': 'application/json',
  }
})

export default apiInstance