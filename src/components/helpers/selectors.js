export default function getAppointmentsForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day);
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const appointments = currentDay[0].appointments.map(
    (apt) => state.appointments[apt]
  );
  return appointments;
}
