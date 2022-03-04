const clientesRoutes = require('./clientes-routes');

module.exports = (app) => {
    app.use(clientesRoutes)
};