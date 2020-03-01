import api from "./api";

export const getPlanetsService = data => api.get(`/planets/?search=${data}`);
