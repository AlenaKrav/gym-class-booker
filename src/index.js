import { getWeekClassesInfo } from "./get-weekly-classes-info.js";
import { getNextWeekDates } from "./get-next-week-dates.js";
import { filterMyClasses } from "./filter-my-weekly-classes.js";
import { getClassInfoForRequest } from "./get-class-info-for-request.js";
import { login } from "./login.js";
import { log } from "./logger.js";

log("Iniciando preparación semanal", "index.log");

try {
  const { idSocio, idCentro } = await login();
  log("Login correcto", "index.log");

  const { lunes, jueves } = getNextWeekDates();

  const listaClases = await getWeekClassesInfo(idCentro, lunes, jueves);
  log(
    `Clases de la semana que viene obtenidas: ${listaClases.length}`,
    "index.log",
  );

  const myWeeklyClasses = filterMyClasses(listaClases);
  log(
    `Filtradas las clases que nos interesan: ${myWeeklyClasses.length}`,
    "index.log",
  );

  await getClassInfoForRequest(idSocio, myWeeklyClasses);

  log(
    `Las clases del interés escritas en el fichero: ${myWeeklyClasses.length}`,
    "index.log",
  );
} catch (error) {
  console.error("Error durante la preparación de reservas:");
  console.error(error);
  log(`Error durante la preparación de reservas: ${error}`, "index.log");
  process.exitCode = 1;
}
