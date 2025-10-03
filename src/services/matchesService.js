import api from "./api"; 

const API_URL = "api/v1/matches"; 

export async function search(last_id = 0, limit = 10) { 
    const res = await api.get(`${API_URL}/search?last_id=${last_id}&limit=${limit}`); 
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

export async function getLikes() {
  const { data } = await api.get(`${API_URL}/liked-back`);
  return data;
}

export async function getMatches(offset = 0, limit = 10, filters) {
  const payload = {
    name: filters?.name ?? "",
    order_by: filters?.order_by ?? "best_match",
    age_from: filters?.age_from ?? 18,
    age_to: filters?.age_to ?? 100,
    distance: filters?.distance ?? 80,
    interests: filters?.interests ?? [],
    tags: filters?.tags ?? [],
  };

  const res = await api.get(`${API_URL}/my`, {
    params: {
      offset,
      limit,
      name: payload.name,
      order_by: payload.order_by, 
      age_from: payload.age_from, 
      age_to: payload.age_to, 
      distance: payload.distance, 
      interests: payload.interests, 
      tags: payload.tags, 
    },
    paramsSerializer: {
      indexes: null,
    }
  });

  return res.data.profiles;
}