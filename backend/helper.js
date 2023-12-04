const axios = require("axios");

const connect = require("./connections/connectRedis");

let client;
(async () => {
  try {
    client = await connect();
  } catch (err) {
    console.log(err);
  }
})();

const geocode = async (city) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
  );

  if (response.data.length == 0) return {};

  let data = {
    name: response.data[0].name,
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };

  await client.setEx(
    city.toLowerCase(),
    process.env.CACHE_EXPIRY,
    JSON.stringify(data)
  );
  return data;
};

const helper = async (cities) => {
  const result = {};

  for (city of cities) {
    let obj;

    try {
      const value = await client.get(city.toLowerCase());
      if (value !== null) {
        obj = JSON.parse(value);
      } else {
        obj = await geocode(city);
      }

      const { name, lat, lon } = obj;

      if (!name || !lat || !lon) {
        continue;
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`
      );
      const data = response.data.main;
      result[name] = `${data.temp}C`;
    } catch (err) {
      console.error(err);
    }
  }
  return result;
};

module.exports = helper;
