import api from "../api/axios";

export const getEmployees = (search = "") => {
  return api.get(
    `/employees?search=${search}`,
  );
};

export const createEmployee = (
  data: any,
) => {
  return api.post(
    "/employees",
    data,
  );
};

export const updateEmployee = (
  id: string,
  data: any,
) => {
  return api.put(
    `/employees/${id}`,
    data,
  );
};

export const deleteEmployee = (
  id: string,
) => {
  return api.delete(
    `/employees/${id}`,
  );
};

export const getEmployeeById = (
  id: string,
) => {
  return api.get(
    `/employees/${id}`,
  );
};