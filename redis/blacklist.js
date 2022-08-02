import { createClient } from "redis";

const blacklist = createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});
blacklist.on("connect", () => console.log("Connected to Redis!"));
blacklist.on("error", (err) => console.log("Redis Client Error", err));
await blacklist.connect();

export default blacklist;
