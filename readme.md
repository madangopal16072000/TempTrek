# TempTrek

**Description**
The City Weather Forecast project is a web application that leverages the OpenWeather API to provide accurate and up-to-date weather forecasts for various cities across the globe. Users can input the name of a city, and the application retrieves and displays essential weather information for the specified location.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

### To Run it Locally

1. First Clone the repository by downloading it or using local git
2. After downloading head into Backend folder and on terminal run `npm install`
3. Create a .env file

   1. head over to [openweathermap.com](https://home.openweathermap.org/users/sign_up) and create a free acount to get a api key.
   2. download the redis for your operating sytem

   ````PORT=3000
        WEATHER_API_KEY=//your weather api key
        CACHE_EXPIRY=3600
        REDIS_PORT=6379
        REDIS_URL=your redis install url```

   ````

4. Now move to frontend directory
5. run `npm install`
6. create .env file
   1. get the url of your backend server
   ```
   VITE_API_BASE_URL=//your backend server address
   ```

## Usage

**Deployment Link**
[TempTrek](https://temp-trek-madangopal16072000.vercel.app/)

**Demo Video**
[![Demo](http://img.youtube.com/vi/QbgQwmLOIcY/0.jpg)](https://youtu.be/QbgQwmLOIcY "Video Title")

## Features

- See Weather Forecast of Specified Location
- Implemented Redis Caching for Fast Retrival of Data
- Used OpenWeatherMap API for Weather Forecast

## Screenshots
![image](https://github.com/madangopal16072000/TempTrek/assets/109917122/870ce1c0-b889-43d5-8472-87ed37f2d8b2)
![image](https://github.com/madangopal16072000/TempTrek/assets/109917122/1c8a5d1b-dbaf-4b07-83d4-559e2a52c99f)
