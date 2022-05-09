# Google Sheets API

Backend para para actualizar información en una hoja de cálculo tipo [Google Sheets](https://workspace.google.com/intl/es-419/products/sheets/).

Para poder correr la aplicación, se debe contar con los credenciales apropiados de https://console.cloud.google.com y debemos crea un archivo tipo `.env` en el folder raíz con la siguiente información:

```text
# Generales #
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

# Opcional #
SENTRY_URL=
```

Si la aplicación no detecta esta información, no iniciará y desplegará "`ERROR TERMINAL: ...`" en la consola.

Para iniciar la aplicación en modo `produccion` correr:

```bash
npm start
```

o en modo `desarrollo`:

```bash
npm run dev
```
