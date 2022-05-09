const app = require('./app');

const env = process.env.ENTORNO.toUpperCase();
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`- Entorno: ${env}`);
  console.log(`- Servidor iniciado en puerto: ${port}`);
});
