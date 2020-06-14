import React from "react";

export default function Card(props) {
  const handleClick = () => props.handleClick(pony);
  const { pony, cardSide, inMatches } = props;
  const cardClass = inMatches
    ? "grid__square--pony-image-matched"
    : "grid__square--pony-image";
  return (
    <div key={pony.id} className="grid__square" onClick={handleClick}>
      <img
        src={`./images/${cardSide}`}
        alt={pony.name}
        id={pony.id}
        className={cardClass}
      />
    </div>
  );
}
