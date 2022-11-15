const express = require("express");
const bookingRouter = express.Router();
// importing bookings Model from the model
const bookingsModel = require("../model/bookings");

// router for get request
bookingRouter.get("/booking", (req, res, next) => {
  // getting all the booking data from the db and if it is empty we are sending an empty array as response and not then the last booking is sended
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
  // storing the user data entered in the frontend in the data constant
  const data = req.body;

  const movie = data.movie;
  const slot = data.timeSlot;
  const seats = data.seat;

  // creating a new model withh the data fetched from the frontend
  const movieBooking = new bookingsModel({ movie, slot, seats });

  // saving the user data in the database and then finding out the last result and sending it back to the frontend as a response
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
});

// extra bonus router added for deleting and empting the database
bookingRouter.delete("/booking", (req, res, next) => {
  // deleting all the last bookings and sending a 204 code and a message object as response
  bookingsModel
    .deleteMany({})
    .then(() => res.status(204).send({ deleted: "Deleted" }))
    .catch((err) => console.log(err));
});

module.exports = bookingRouter;
