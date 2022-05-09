const usuarios = require('../routes/usuarios');

module.exports = (app) => {
  app.use('/v1/usuarios', usuarios);
};
