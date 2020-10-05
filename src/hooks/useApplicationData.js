import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const spotCounter = (days, day, operator) => {
    for (const obj of days) {
      if (obj.name === day && operator === "plus") {
        obj.spots = obj.spots + 1;
      }
      if (obj.name === day && operator === "minus") {
        obj.spots = obj.spots - 1;
      }
    }
  };

  const bookInterview = (id, interview) => {
    if (state.appointments[id].interview === null) {
      spotCounter(state.days, state.day, "minus");
    }

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const bookedAppointment = axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
    return bookedAppointment;
  };

  const cancelInterview = (id) => {
    spotCounter(state.days, state.day, "plus");

    const deleteAppointment = axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: null,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState({
          ...state,
          appointments,
        });
      });
    return deleteAppointment;
  };

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
