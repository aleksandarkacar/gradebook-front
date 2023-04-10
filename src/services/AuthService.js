import httpService from "./HttpService";
class AuthService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  login = async (credentials) => {
    const response = await this.axios.post("/login", credentials);
    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", response.data.user.id);
    localStorage.setItem("first_name", response.data.user.first_name);
    localStorage.setItem("last_name", response.data.user.last_name);
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
    localStorage.removeItem("userId");
  };
}

const authService = new AuthService();

export default authService;
