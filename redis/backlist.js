const { createClient } = require("redis");

// let blacklist;
const blacklist = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD
});
blacklist.on("connect", () => console.log("Connected to Redis!"));
blacklist.on("error", (err) => console.log("Redis Client Error", err));
blacklist.connect();

module.exports = blacklist;
