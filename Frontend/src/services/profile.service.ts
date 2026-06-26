import api from "../api/axios";

export const getProfile = () => {
  return api.get("/employees/me");
};

export const updateProfile = (data: any) => {
  return api.put("/auth/profile", data);
};