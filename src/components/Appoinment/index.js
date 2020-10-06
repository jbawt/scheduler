import React from "react";
import "components/Appoinment/styles.scss";
import Header from "components/Appoinment/Header";
import Show from "components/Appoinment/Show";
import Empty from "components/Appoinment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appoinment/Form";
import Status from "components/Appoinment/Status";
import Confirm from "components/Appoinment/Confirm";
import Error from "components/Appoinment/Error";
// import { getAppointmentsForDay } from "components/helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appoinment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onEdit = () => {
    transition(EDIT);
  };

  const onConfirmDelete = () => {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const onCancelDelete = () => {
    back();
  };
  const onClose = () => {
    back();
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are You Sure?"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          interview={props.interview}
          onCancel={() => back()}
          onSave={onSave}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Having trouble deleting appointment"
          onClose={onClose}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Having trouble saving appointment" onClose={onClose} />
      )}
    </article>
  );
}
