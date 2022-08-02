import "dotenv/config";
import app from "./src/app.js";
const port = process.env.PORT || 3000;
import "./redis/blacklist.js";
const server = app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}/`);
});

export default server;
