import React from "react";

export default function Card(props) {
  const handleClick = () => props.handleClick(pony);
  const { pony, cardSide } = props;
  return (
    <div key={pony.id} className="grid__square" onClick={handleClick}>
      <img
        src={`./images/${cardSide}`}
        alt={pony.name}
        id={pony.id}
        className="grid__square--pony-image"
      />
      <img
        src={`./images/${cardSide}`}
        alt={pony.name}
        id={pony.id}
        className="grid__square--pony-image"
      />
    </div>
  );
}
