import api from "../api/axios";

export const getLeaves = () => {
  return api.get("/leaves");
};

export const createLeave = (
  data: any,
) => {
  return api.post(
    "/leaves",
    data,
  );
};

export const approveLeave = (
  id: string,
) => {
  return api.post(
    `/leaves/${id}/approve`,
  );
};

export const rejectLeave = (
  id: string,
) => {
  return api.post(
    `/leaves/${id}/reject`,
  );
};