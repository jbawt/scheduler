import React from "react";
import "components/Appoinment/styles.scss";
import Header from "components/Appoinment/Header";
import Show from "components/Appoinment/Show";
import Empty from "components/Appoinment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "components/Appoinment/Form";
import Status from "components/Appoinment/Status";
import Confirm from "components/Appoinment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

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
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const onEdit = () => {
    transition(EDIT);
  };

  const onConfirmDelete = () => {
    transition(DELETE);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  };

  const onCancelDelete = () => {
    back();
  };

  return (
    <article className="appointment">
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
    </article>
  );
}
