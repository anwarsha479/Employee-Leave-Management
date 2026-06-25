import api from "../api/axios";

export const getDashboardStats = () => {
  return api.get("/dashboard/stats");
};

export const getEmployeeDashboardStats = () => {
  return api.get("/dashboard/employee");
};