import React from 'react';
import 'components/Appoinment/styles.scss';
import Header from 'components/Appoinment/Header';
import Show from 'components/Appoinment/Show';
import Empty from 'components/Appoinment/Empty';

export default function Appoinment(props) {
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />}
    </article>
  )
}