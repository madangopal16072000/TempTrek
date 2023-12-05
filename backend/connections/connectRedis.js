const redis = require("redis");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const connect = async () => {
  const client = await redis
    .createClient(process.env.REDIS_URL)
    .on("error", (err) => console.log("Redis connection Error", err))
    .connect();

  return client;
};

module.exports = connect;
