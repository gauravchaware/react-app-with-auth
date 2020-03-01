import api from "./api";

export const postAuthService = data =>
  api.get(`/people/?search=${data.username}`);
