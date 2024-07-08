require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const TaskRouter = require("./routes/taskRoutes.js");
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require("method-override");
const connectToDatabase = require("./database/mongodb");

connectToDatabase();
app.use(methodOverride("_method"));
app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/tasks", TaskRouter);

app.get("/", (req, res) => {
  res.redirect("/tasks");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
