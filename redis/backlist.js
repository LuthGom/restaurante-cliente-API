
const redis = require("redis");

let blacklist;
blacklist = redis.createClient(6379, "127.0.0.1", { prefix: "blacklist:" });
blacklist.on("connect", () => console.log("Connected to Redis!"));
blacklist.on("error", (err) => console.log("Redis Client Error", err));
blacklist.connect();

module.exports = blacklist;