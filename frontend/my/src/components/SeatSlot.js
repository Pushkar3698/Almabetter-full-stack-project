import React from "react";

export const SeatSlot = ({ seatName, cb }) => {
  const handleChange = (e) => {
    const seatData = {
      seatName: seatName,
      seats: e.target.value,
    };

    cb(seatData);
  };

  return (
    <div className="seat-slot flex" style={{ flexDirection: "column" }}>
      <div className="seat-name">
        <p>{seatName}</p>
      </div>
      <div className="seat-input">
        <input
          type="number"
          name="seats"
          id=""
          onChange={handleChange}
          min="0"
          step={1}
          max="10"
        />
      </div>
    </div>
  );
};
