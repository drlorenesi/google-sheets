const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

module.exports = (app) => {
  app.use(express.json());
  if (process.env.ENTORNO === 'desarrollo') {
    app.use(morgan('dev'));
  }
  if (process.env.ENTORNO === 'produccion') {
    app.use(helmet());
    app.use(compression());
  }
};
