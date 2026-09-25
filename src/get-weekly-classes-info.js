import apiClient from "./api.js";

export async function getWeekClassesInfo(idCentro, fechaInicio, fechaFin) {
  const response = await apiClient.get(`centros/${idCentro}/clases`, {
    params: {
      fechaInicio,
      fechaFin,
    },
  });

  return response.data
}
