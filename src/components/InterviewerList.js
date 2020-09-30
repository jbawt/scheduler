import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
// import classnames from "classnames";
import 'components/InterviewerList.scss';

export default function interviewerList(props) {

  const interviewerList = props.interviewers.map((person) => {
    return <InterviewerListItem
      key={person.id}
      name={person.name}
      selected={props.interviewer === person.id}
      avatar={person.avatar}
      setInterviewer={(event) => props.setInterviewer(person.id)}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}
