const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.port || 3001;
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL);
mongoose.set("strictQuery", true);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

//Cors options
const corsOptions = {
  origin: ["https://superb-marshmallow-50848a.netlify.app"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

const toDoRouter = require("./routes/toDoRoutes");
app.use("/todo", toDoRouter);

app.listen(port, () => console.log(`Listening on ${port}`));
