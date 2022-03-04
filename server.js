const app = require('./src/app');
const port = process.env.PORT || 3000
const routes = require('./src/routes');
routes(app)

const server = app.listen(port, () => { console.log(`Servidor rodando em: http://localhost:${port}/`) })


module.exports = server;