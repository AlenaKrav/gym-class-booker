import apiClient from "./api.js";
import { login } from "./login.js";
import { log } from "./logger.js";

export async function bookClass(idClase, idPremium, plazaId) {
  log("bookClass() - Iniciando login", "reserve.log");
  const {idSocio} = await login();

  log("bookClass() - Enviando request", "reserve.log");
  const response = await apiClient.post(
    `/socios/${idSocio}/clases/${idClase}/reservar/`,
    {
      id: idPremium,
      idMultibono: null,
      tipo: 0,
      modalidad: 0,
      plazaId,
      comentario: null,
    },
  );

  return response.data;
  
}
