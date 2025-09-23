import api from "./api";

const API_URL = "/api/v1/auth";

const buildRegisterPayloadFromForm = (v = {}) => {
  const tuple =
    Array.isArray(v.location) && v.location.length === 2
      ? [Number(v.location[0]), Number(v.location[1])]
      : null;

  const tupleIsValid = Array.isArray(tuple) && tuple.every((n) => Number.isFinite(n));

  const asString =
    typeof v.location === "string"
      ? v.location
      : typeof v.city === "string"
      ? v.city
      : "";

  const location = tupleIsValid ? tuple : asString;

  return {
    user: {
      email: v.email ?? "",
      password_1: v.password1 ?? "",
      password_2: v.password2 ?? "",
    },
    profile: {
      full_name: v.fullName ?? "",
      age: Number(v.age) || 18,
      gender: v.gender || "male",
      city: v.city || "",
      location, 
      description: v.description || "",
      search_gender: v.search_gender || "female",
      interests: v.interests || [],
      tags: v.tags || [],
      habits: (v.habits || []).map((h) => ({ type: h.type, value: h.value })),
      quiz: v.quiz || {},
    },
    settings: {
      search_settings: {
        age_range: v.age_range || `${v.ageMin ?? 18}-${v.ageMax ?? 28}`,
        distance: Number(v.distance) || 50,
        interests: v.search_interests || {},
        tags: v.search_tags || {},
        habits: v.search_habits || {},
        show_friendship: !!v.show_friendship,
        only_verified: !!v.only_verified,
      },
    },
  };
};

// Register
const register = async (formValues) => {
  const payload = buildRegisterPayloadFromForm(formValues);
  const { data } = await api.post(`${API_URL}/register`, payload);

  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// Login 
const login = async (credentials) => {
  const body = { email: credentials.email, password: credentials.password };
  const { data } = await api.post(`${API_URL}/login`, body);

  if (data) localStorage.setItem("user", JSON.stringify(data));
  return data;
};

// Logout
const logout = () => {
  localStorage.removeItem("user");
};

// User Check
export const checkUserExists = async (email) => {
  const { data } = await api.get(`${API_URL}/check-user-exists`, {
    params: { email },
  });
  return Boolean(data);
};

// Reset Code 
export const sendResetCode = async (email) => {
  const { data } = await api.post(`${API_URL}/reset-password`, { email });
  return data;
};

// Verify Reset Code
export const verifyResetCode = async (email, code) => {
  const { data } = await api.post(`${API_URL}/verify-reset-code`, { email, code });
  return data;
};

// Change Password
export const changePassword = async (email, password_1, password_2, code) => {
  const { data } = await api.post(`${API_URL}/change-password`, {
    email,
    password_1,
    password_2,
    code,
  });
  return data;
};

// Refresh
export const refreshToken = async () => {
  const { data } = await api.post(`${API_URL}/refresh`, {}, {withCredentials: true});
  return data;
};

const authService = {
  register,
  login,
  logout,
  sendResetCode,
  verifyResetCode,
  changePassword,
  refreshToken
};

export default authService;
