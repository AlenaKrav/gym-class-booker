import { loginAsClient, loginAsUser } from "./auth.js";
import { setToken } from "./api.js";

export async function login() {
  const clientResponse = await loginAsClient();
  const clientToken = clientResponse.data;
  setToken(clientToken);

  const userResponse = await loginAsUser();
  const userToken = userResponse.data.token;
  const idSocio = userResponse.data.idSocio;
  const idCentro = userResponse.data.idCentro;
  setToken(userToken);

  return {idSocio, idCentro};
}
