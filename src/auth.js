import apiClient from "./api.js";

export async function loginAsClient() {
  return apiClient.post("/acceso/clientes/login", {
    nombre: process.env.CLIENTE_API,
    password: process.env.PASS_CLIENTE_API,
  });
}

export async function loginAsUser() {
  return apiClient.post("/acceso/usuarios/login", {
    nombre: process.env.USER_API,
    password: process.env.PASS_USER_API,
  });
}
