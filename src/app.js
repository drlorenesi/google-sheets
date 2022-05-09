require('dotenv').config();
const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();

// Startup Checks
require('./config/startup')();
// Prod Logger
if (process.env.ENTORNO === 'produccion') {
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}
// Dev Logger
if (process.env.ENTORNO === 'desarrollo') {
  require('./config/logger');
}
// Middleware
require('./config/middleware')(app);
// Routes
require('./config/routes')(app);
// Dev Error Handler
if (process.env.ENTORNO === 'desarrollo') {
  app.use(require('./middleware/devError'));
}

module.exports = app;
