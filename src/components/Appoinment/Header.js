import React from "react";

export default function Header(props) {
  return (
    <header className="appointment_time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__seperator" />
    </header>
  );
}
