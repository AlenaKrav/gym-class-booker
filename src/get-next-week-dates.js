export function getNextWeekDates() {
  const date = new Date();
  const day = date.getDay();

  const daysUntilMonday = day === 0 ? 1 : 8 - day;

  const lunes = new Date(date);
  lunes.setDate(date.getDate() + daysUntilMonday);

  const jueves = new Date(lunes);
  jueves.setDate(lunes.getDate() + 3);


  return {
    lunes: lunes.toDateString(),
    jueves: jueves.toDateString(),
  };
}
