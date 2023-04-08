import httpService from "./HttpService";
class GradebookService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  getAll = async () => {
    const response = await this.axios.get("/gradebooks");
    return response.data;
  };

  get = async (id) => {
    const response = await this.axios.get(`/gradebooks/${id}`);
    return response.data;
  };

  add = async (newGradebook) => {
    const response = await this.axios.post("/gradebooks/", newGradebook);
    return response.data;
  };

  search = async (name) => {
    const response = await this.axios.get(`/gradebooks?name=${name}`);
    return response.data;
  };
}

const gradebookService = new GradebookService();

export default gradebookService;
