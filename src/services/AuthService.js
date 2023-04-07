import httpService from "./HttpService";
class AuthService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  login = async (credentials) => {
    const response = await this.axios.post("/login", credentials);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data.user;
  };

  register = async (credentials) => {
    const response = await this.axios.post("/register", credentials);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data.user;
  };

  logout = () => {
    localStorage.removeItem("token");
  };
}

const authService = new AuthService();

export default authService;
