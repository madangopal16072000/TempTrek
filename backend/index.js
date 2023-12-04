if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const helper = require("./helper");
const cors = require("cors");

//redis client

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello server is working properly");
});

app.post("/api/v1/getWeather", async (req, res) => {
  const cities = req.body.cities;

  if (!cities) {
    res.status(400).json({
      success: false,
      message: "Input can't be empty",
    });
  }
  const result = await helper(cities);

  res.status(200).json({
    success: true,
    cities: req.body.cities,
    data: { weather: result },
  });
});

app.listen(PORT, () => {
  console.log(`Server listening PORT : ${PORT}`);
});
