import api from "./api";

const API_URL = "/api/v1/verif";

export const startVeriffSession = async () => {
  const { data } = await api.post(`${API_URL}/start`);
  return data;
};