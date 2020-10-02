function getAppointmentsForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day);
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const appointments = currentDay[0].appointments.map(
    (apt) => state.appointments[apt]
  );
  return appointments;
}

function getInterview(state, interview) {
  if (interview !== null) {
    return {
      interviewer: state.interviewers[interview.interviewer],
      student: interview.student,
    };
  }
  return null;
}

function getInterviewersForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day);
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  if (currentDay === undefined) {
    return [];
  }
  const interview = currentDay[0].interviewers.map(
    (interviewerID) => state.interviewers[interviewerID]
  );
  return interview;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
