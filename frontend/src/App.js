import "./App.css";
import { useState, useEffect } from "react";
import ContentContainer from "./components/ui/ContentContainer";
import Slots from "./components/Slots";
import data from "./components/data/data";

import LastBooking from "./components/LastBooking";
import { Seats } from "./components/Seats";

function App() {
  // initial state for our app for post request
  const [movieData, setmovieData] = useState({
    movie: "",
    timeSlot: "",
    seat: [],
  });

  const [fetchedData, setfetchedData] = useState([]);

  // requiring the data provided by almabetter for our app
  const { movies, slots, seats } = data;

  // this function collects the seats data and updates the state
  const handleSeats = (seatData) => {
    const findSeat = movieData.seat.findIndex(
      (el) => el.seatName === seatData.seatName
    );

    if (findSeat !== -1) {
      const newSeatData = [...movieData.seat];
      newSeatData[findSeat] = seatData;
      setmovieData((prev) => {
        return {
          ...prev,
          seat: newSeatData,
        };
      });
    } else {
      setmovieData((prev) => {
        return {
          ...prev,
          seat: [...prev.seat, seatData],
        };
      });
    }
  };

  // this functions tells us to clear the db
  const deleteData = () => {
    fetch("http://localhost:8080/api/booking", { method: "DELETE" })
      // .then((res) => console.log(res))
      .then(() => getData())
      .catch((err) => console.log(err));
  };

  // this function fetches the last booking and update the state for displaying of it
  const getData = async () => {
    return fetch("http://localhost:8080/api/booking")
      .then((data) => data.json())
      .then((data) => setfetchedData(data))
      .catch((err) => console.log(err));
  };

  // this function sends the collected state to the db and updates it further gives a response of the last booking
  const handelPost = async (data) => {
    return fetch("http://localhost:8080/api/booking", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        return res.json();
      })

      .then((data) => {
        return setfetchedData(data);
      })

      .catch((err) => console.log(err));
  };

  // this will run when the component will mount and update the state ultimately setting up the state to show the last booking
  useEffect(() => {
    getData();
  }, []);

  // these functions updates the state
  const handleMovie = (selectedMovie) => {
    setmovieData((prev) => {
      return {
        ...prev,
        movie: selectedMovie,
      };
    });
  };

  const handleTime = (selectedTime) => {
    setmovieData((prev) => {
      return {
        ...prev,
        timeSlot: selectedTime,
      };
    });
  };
  // ///////////////////////////////////
  // this function handle the submit event which will send data to the server
  const handleSubmit = () => {
    const { movie, seat, timeSlot } = movieData;
    if (movie === "" || timeSlot === "" || seat.length <= 0) {
      alert("Please select every field to continue further");
      return;
    }
    return handelPost(movieData);
  };

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="left">
          <ContentContainer label={"Select A Movie"}>
            {movies.map((el, i) => (
              <Slots
                label={el}
                key={i}
                cb={handleMovie}
                movieData={movieData.movie}
              />
            ))}
          </ContentContainer>

          <ContentContainer label={"Select a Time Slot"}>
            {slots.map((el, i) => (
              <Slots
                label={el}
                key={i}
                movieData={movieData.timeSlot}
                cb={handleTime}
              />
            ))}
          </ContentContainer>

          <ContentContainer label={"Select the Seats"}>
            <Seats seats={seats} cb={handleSeats} data={fetchedData} />
          </ContentContainer>

          <div className="submit-btn">
            <button onClick={handleSubmit}>Submit!</button>

            <button onClick={deleteData}>Delete!</button>
          </div>
        </div>
        <div className="right">
          <LastBooking data={fetchedData} />
        </div>
      </div>
    </div>
  );
}

export default App;
