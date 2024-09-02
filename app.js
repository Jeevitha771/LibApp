const cors = require("cors");
//const routes = require("./routes/routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
//app.use(routes);

dotenv.config({ path: "./config.env" });
//Mongoose
require("./db/conn");
app.use(express.json());

app.use(require("./router/auth"));
const PORT = process.env.PORT;

//Middleware
const middleware = (req, res, next) => {
  console.log(`Hello my middleware`);
  next();
};

app.get("/", (req, res) => {
  res.send(`Hello world from server`);
});
app.get("/about", middleware, (req, res) => {
  console.log("This is about route");
  res.send("About page");
});
app.get("/contact", (req, res) => {
  res.send("Contact page");
});
app.get("/signIn", (req, res) => {
  res.send("Hello Login world");
});
app.get("/signUp", (req, res) => {
  res.send("Hello Registration world");
});
app.listen(PORT, () => {
  console.log(`Server is running at port no ${PORT}`);
});

//********************************************************************************* */
// var express = require("express");
// var server = express();
// var routes = require("./routes/routes");
// var mongoose = require("mongoose");
// const cors = require("cors");
// mongoose
//   .connect(
//     "mongodb+srv://jeevitha:jeevitha@cluster1.2kufkfl.mongodb.net/angdb?retryWrites=true&w=majority&appName=Cluster1",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB", err);
//   });

// server.use(cors());
// server.use(express.json());
// server.use(routes);

// server.listen(8000, function check(error) {
//   if (error) {
//     console.log("errorr");
//   } else {
//     console.log("startedddddd");
//   }
// });
