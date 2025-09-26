import api from "./api"; 

const API_URL = "api/v1/matches"; 

export async function search(offset = 0, limit = 10) { 
    const res = await api.get(`${API_URL}/search?offset=${offset}&limit=${limit}`); 
    return res.data.profiles; 
}

export async function likeProfile(toProfileId) {
  const { data } = await api.post(`${API_URL}/like`, null, {
    params: { to_profile_id: toProfileId },
  });
  return data;
}

export async function dislikeProfile(toProfileId) {
  const { data } = await api.post(`${API_URL}/dislike`, null, {
    params: { to_profile_id: toProfileId },
  });
  return data;
}