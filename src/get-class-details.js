import apiClient from "./api.js";

export async function getClassDetails(idSocio, idClase){
    const response = await apiClient.get(`/socios/${idSocio}/clases/${idClase}`);
    return response.data;
}