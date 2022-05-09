const usuarios = require('../routes/usuarios');
const estado = require('../routes/estado');

module.exports = (app) => {
  app.use('/v1/usuarios', usuarios);
  app.use('/v1/estado', estado);
};
