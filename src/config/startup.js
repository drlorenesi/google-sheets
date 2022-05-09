module.exports = () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.error(
      'ERROR TERMINAL: GOOGLE_SERVICE_ACCOUNT_EMAIL no está definido.'
    );
    process.exit(1);
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    console.error('ERROR TERMINAL: GOOGLE_PRIVATE_KEY no está definida.');
    process.exit(1);
  }
};
