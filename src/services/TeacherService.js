import httpService from "./HttpService";
class TeacherService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  getAll = async () => {
    const response = await this.axios.get("/users");
    return response.data;
  };

  get = async (id) => {
    const response = await this.axios.get(`/users/${id}`);
    return response.data;
  };

  getAvailable = async () => {
    const response = await this.axios.get("/users/available");
    return response.data;
  };

  search = async (first_name, last_name) => {
    console.log(first_name, last_name);
    const response = await this.axios.get(
      `/users?first_name=${first_name}&last_name=${last_name}`
    );
    return response.data;
  };
}

const teacherService = new TeacherService();

export default teacherService;
