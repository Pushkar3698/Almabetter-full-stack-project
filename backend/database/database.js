// requiring the mongoose package
const mongoose = require("mongoose");

// mongodb provided connection url
const connectionString = `mongodb+srv://Pushkar3698:${encodeURIComponent(
  "Pushi@3698"
)}@cluster0.ray7ni3.mongodb.net/?retryWrites=true&w=majority`;

// custom function made to connect the mongodb database and passing up a callback function
const connectDb = (server) => {
  mongoose
    .connect(connectionString, { useNewUrlParser: true })
    .then((res) => console.log("db-connected"))
    .then(() => server())
    .catch((err) => console.log(err));
};

module.exports = connectDb;
