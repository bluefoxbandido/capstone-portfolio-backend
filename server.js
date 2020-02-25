var mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");

const user = require("./routes/user");
const blogItem = require("./routes/blogItem");
const portfolioItem = require("./routes/portfolioItem");


const app = express();
app.use(cors());
require("dotenv").config();

app.use(express.json());

const dbRoute = process.env.MONGODB_MAUVE_URI;
mongoose.connect(dbRoute, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;

db.once("open", () => console.log("Connected to the database"));
db.on("error", console.error.bind(console, "MongoDB Connection Error:"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.get("/", (req, res) => {
  res.json("Connected to API")
})

app.use("/user", user);
app.use("/blogs", blogItem);
app.use("/projects", portfolioItem);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
