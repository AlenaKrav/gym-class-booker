export function filterMyClasses(listaClases) {
  const clasesObjetivo = {
    lunes: {
      horaInicio: "15:00:00",
      idActividad: 11111,
      nombreActividad: "Clase_1",
      idZona: 1,
    },
    martes: {
      horaInicio: "16:00:00",
      idActividad: 22222,
      nombreActividad: "Clase_2",
      idZona: 2,
    },
    miércoles: {
      horaInicio: "17:00:00",
      idActividad: 33333,
      nombreActividad: "Clase_3",
      idZona: 3,
    },
    jueves: {
      horaInicio: "18:00:00",
      idActividad: 44444,
      nombreActividad: "Clase_4",
      idZona: 4,
    }
  };

  const clasesSeleccionadas = [];

  for (const dia of listaClases) {
    const fecha = new Date(dia.fecha);
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    const nombreDia = diasSemana[fecha.getDay()];
    const objetivo = clasesObjetivo[nombreDia];

    if(!objetivo){
      continue;
    }

    const claseEncontrada = dia.clases.find(
      (clase) =>
        clase.horaInicio === objetivo.horaInicio &&
        clase.idActividad === objetivo.idActividad &&
        clase.idZona === objetivo.idZona,
    );

    if (claseEncontrada) {
      clasesSeleccionadas.push({
        fecha: dia.fecha,
        ...claseEncontrada,
      });
    }
  }
  return clasesSeleccionadas;
}
