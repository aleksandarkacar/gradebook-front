import axios from "axios";

class HttpService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8000/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const httpService = new HttpService();

export default httpService;
