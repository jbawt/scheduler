import React from "react";
import classname from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    }
    if (props.spots === 1) {
      return "1 spot remaining";
    }
    return `${props.spots} spots remaining`;
  };

  const dayClass = classname("day-list__item", {
    "day-list__item--selected": props && props.selected,
    "day-list__item--full": props && props.spots === 0,
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2>{props.name}</h2>
      <h3>{formatSpots()}</h3>
    </li>
  );
}
