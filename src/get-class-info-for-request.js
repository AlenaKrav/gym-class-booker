import fs from "fs";
import { getClassDetails } from "./get-class-details.js";
import { RESERVAS_FILE } from "./paths.js";

export async function getClassInfoForRequest(idSocio, clases) {
  const reservas = [];

  for (const clase of clases) {
    const detalle = await getClassDetails(idSocio, clase.id);

    const plaza = detalle.plazas.find((plaza) => plaza.tag === "6-1");

    const idCuotaPremium = detalle.formasPago.cuotas.find(
      (cuota) => cuota.nombre === "Premium",
    );

    reservas.push({
      idClase: clase.id,
      fecha: clase.fecha,
      horaInicio: clase.horaInicio,
      nombreActividad: clase.nombreActividad,
      idPremium: idCuotaPremium?.id,
      fechaPlazoInscripcionInicio: detalle.fechaPlazoInscripcionInicio,
      plazaId: plaza?.id,
      estado: "pendiente",
    });
  }
  const clasesParaReservar = JSON.stringify(reservas, null, 2);
  fs.writeFileSync(RESERVAS_FILE, clasesParaReservar, "utf-8");
}
