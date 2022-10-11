const express = require("express");
const bookingRouter = express.Router();
// importing bookings Model from the model
const bookingsModel = require("../model/bookings");

// router for get request
bookingRouter.get("/booking", (req, res, next) => {
  bookingsModel
    .find()
    .then((result) => {
      if (result.length === 0 || !result) {
        return res.send([]);
      } else {
        return res.send(result[result.length - 1]);
      }
    })
    .catch((err) => console.log(err));
});

// router for post request
bookingRouter.post("/booking", (req, res, next) => {
  const data = req.body;

  const movie = data.movie;
  const slot = data.timeSlot;
  const seats = data.seat;

  // creating a new model withh the data fetched from the frontend
  const movieBooking = new bookingsModel({ movie, slot, seats });
  movieBooking
    .save()
    .then(() =>
      bookingsModel
        .find()
        .then((result) =>
          res.status(200).send(JSON.stringify(result[result.length - 1]))
        )
    )
    .catch((err) => console.log(err));

  // res.status(200).send({ type: "post" });
});

// extra bonus router added for delering and empting the database
bookingRouter.delete("/booking", (req, res, next) => {
  bookingsModel
    .deleteMany({})
    .then(() => res.status(204).send({ deleted: "Deleted" }))
    .catch((err) => console.log(err));
});

module.exports = bookingRouter;
