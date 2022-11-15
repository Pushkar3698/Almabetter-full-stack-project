import React from "react";

const Slots = ({ label, cb, movieData }) => {
  return (
    <div
      className="slot-container flex"
      onClick={() => cb(label)}
      style={{ backgroundColor: `${movieData === label ? "coral" : "white"}` }}
    >
      <p>{label}</p>
    </div>
  );
};

export default Slots;
