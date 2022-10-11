import React from "react";

const LastBooking = ({ data }) => {
  return (
    <>
      {data.length === 0 || !data ? (
        <p style={{ color: "red" }}>No Previous Booking Found!</p>
      ) : (
        <div className="booking-container">
          <div className="heading">
            <h2>Last Booking Details :</h2>
          </div>
          <div className="booking-content">
            {data.seats.map((el, i) => (
              <p key={i}>
                <span className="bold">{el.seatName} :</span> {el.seats}
              </p>
            ))}
            <p className="moviename">
              <span className="bold">Movie :</span> {data.movie}
            </p>
            <p className="time">
              <span className="bold">Time :</span> {data.slot}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LastBooking;
