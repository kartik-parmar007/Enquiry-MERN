const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const enquiryRouter = require("./App/routes/web/enquiryRoutes");

// Load environment variables first
dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/enquiries", enquiryRouter);
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
