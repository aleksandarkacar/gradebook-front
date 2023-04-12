import httpService from "./HttpService";
class GradebookService {
  constructor() {
    this.axios = httpService.axiosInstance;
  }

  getAll = async () => {
    const response = await this.axios.get("/gradebooks");
    return response.data;
  };

  getMore = async (currentPage) => {
    const response = await this.axios.get(
      `/gradebooks?page=${currentPage + 1}`
    );
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

  delete = async (id) => {
    const response = await this.axios.delete(`/gradebooks/${id}`);
    return response.data;
  };

  myGradebook = async () => {
    const response = await this.axios.get("/mygradebook");
    return response.data;
  };

  edit = async (id, editedGradebook) => {
    const response = await this.axios.put(`/gradebooks/${id}`, editedGradebook);
    return response.data;
  };

  search = async (name) => {
    const response = await this.axios.get(`/gradebooks?name=${name}`);
    return response.data;
  };

  addStudent = async (student) => {
    const response = await this.axios.post(`/students`, student);
    return response.data;
  };

  deleteStudent = async (id) => {
    const response = await this.axios.delete(`/students/${id}`);
    return response.data;
  };

  addComment = async (comment) => {
    const response = await this.axios.post(`/comments`, comment);
    return response.data;
  };

  deleteComment = async (commentId) => {
    const response = await this.axios.delete(`/comments/${commentId}`);
    return response.data;
  };
}

const gradebookService = new GradebookService();

export default gradebookService;
