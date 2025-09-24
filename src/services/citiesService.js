import api from "./api";

const API_URL = "/api/v1/city/get_by_name?name="

const getCities = async (name, { signal }) => {
    const res = await api.get(`${API_URL}${encodeURIComponent(name)}`, { signal });
    return res.data;
}

export default getCities;