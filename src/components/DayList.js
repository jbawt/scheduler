import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  
  const days = props.days.map(day => {
    return (
      <DayListItem 
        className={props.dayClass}
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay} />
    )
  })

  return days;
}
