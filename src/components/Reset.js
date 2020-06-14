import React from "react";

export default function Reset(props) {
  const handleReset = () => props.handleReset();
  return (
    <button className="reset" onClick={handleReset}>
      Reset Game
    </button>
  );
}
