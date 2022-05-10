const { createClient } = require("redis");

// let blacklist;
const blacklist = createClient({
  url: "redis://redis-15941.c258.us-east-1-4.ec2.cloud.redislabs.com:15941",
  password: "cOH8sucMdVQLWBQXOBq6nx9BwsBp6xUL"
});
blacklist.on("connect", () => console.log("Connected to Redis!"));
blacklist.on("error", (err) => console.log("Redis Client Error", err));
blacklist.connect();

module.exports = blacklist;
