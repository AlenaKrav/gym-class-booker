import fs from "fs";
import { waitUntil } from "./wait-until.js";
import { bookClass } from "./book-my-class.js";
import { log } from "./logger.js";
import { RESERVAS_FILE } from "./paths.js";

log("Iniciando ejecución de reservas", "reserve.log");

let reservas;
try {
  log("Leyendo el JSON con las reservas", "reserve.log");
  const contenido = fs.readFileSync(RESERVAS_FILE, "utf-8");
  reservas = JSON.parse(contenido);
} catch (error) {
  console.error("No se ha podido cargar reservas.json");
  console.error(error);
  log(`No se ha podido cargar reservas.json: ${error}`, "reserve.log");
  process.exit(1);
}

log("Buscando reservas pendientes", "reserve.log");
const reserva = reservas.find((reserva) => reserva.estado === "pendiente");

if (!reserva) {
  console.log("No hay reservas pendientes");
  log(`No hay reservas pendientes`, "reserve.log");
  process.exit(0);
}

log(
  `Próxima reserva: ${reserva.nombreActividad} ${reserva.fecha} ${reserva.horaInicio}`,
  "reserve.log",
);

log(`Esperando hasta ${reserva.fechaPlazoInscripcionInicio}`, "reserve.log");
await waitUntil(reserva.fechaPlazoInscripcionInicio);

try {
  log(`Esperando la función bookClass`, "reserve.log");
  const resultado = await bookClass(
    reserva.idClase,
    reserva.idPremium,
    reserva.plazaId,
  );

  if (resultado.idInscripcion && resultado.resultado === null) {
    reserva.estado = "reservada";
    fs.writeFileSync(RESERVAS_FILE, JSON.stringify(reservas, null, 2), "utf-8");
    log(`La reserva se ha realizado con éxito`, "reserve.log");
  } else {
    log(`La reserva no se ha confirmado:, ${resultado}`, "reserve.log");
  }
} catch (error) {
  log(`Error al realizar la reserva:, ${error.message}`, "reserve.log");
}
