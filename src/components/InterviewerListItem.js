import React from "react";
import classname from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interViewerClass = classname('interviewers__item', {
    'interviewers__item--selected': props.selected
  })
  return (
    <li 
    className={interViewerClass}
    name={props.name}
    selected={props.selected}
    onClick={props.setInterviewer}
    >
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
