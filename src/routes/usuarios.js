const express = require('express');
const Joi = require('joi');
const ULID = require('ulid');
const { validateBody } = require('../middleware/validar');
const { loadUsers } = require('../models/loadSheets');

const router = express.Router();

const validarUsuario = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

// GET ALL ROWS - OK
router.get('/', async (req, res) => {
  // Get the users sheet object
  const users = await loadUsers();
  // Read rows
  const rows = await users.getRows();
  // Set result
  const result = rows.map((row) => {
    return { id: row.id, nombre: row.nombre, email: row.email };
  });

  res.send(result);
});

// GET A ROW - OK
router.get('/:id', async (req, res) => {
  // Get the sheet object
  const users = await loadUsers();
  // Read rows
  const rows = await users.getRows();
  // Get user
  const user = rows.filter((row) => {
    return row.id === req.params.id;
  });
  const userInfo = {
    id: user[0].id,
    nombre: user[0].nombre,
    email: user[0].email,
  };

  res.send(userInfo);
});

// UPDATE A ROW
router.put('/:id', [validateBody(validarUsuario)], async (req, res) => {
  // Get the sheet object
  const users = await loadUsers();
  // Read rows
  const rows = await users.getRows();
  // Get user
  const user = rows.filter((row) => {
    return row.id === req.params.id;
  });
  // Check if user exists
  if (user.length < 1)
    return res.status(404).send({ message: 'User does not exist.' });
  // Update properties
  user[0].nombre = req.body.nombre;
  user[0].email = req.body.email;
  // Save updated properties
  await user[0].save();
  const userInfo = {
    id: user[0].id,
    nombre: user[0].nombre,
    email: user[0].email,
  };

  res.send(userInfo);
});

// CREATE A NEW ROW - OK
router.post('/', async (req, res) => {
  // Get the sheet object
  const sheet = await loadUsers();

  const newRow = {
    id: ULID.ulid(),
    nombre: req.body.nombre,
    email: req.body.email,
  };

  let result = await sheet.addRow(newRow);

  if (result) return res.send(newRow);
});

// DELETE A ROW - OK
router.delete('/:id', async (req, res) => {
  // Get the sheet object
  const users = await loadUsers();
  // Read rows
  const rows = await users.getRows();
  // Get user
  const user = rows.filter((row) => {
    return row.id === req.params.id;
  });
  // Check if user exists
  if (user.length < 1)
    return res.status(404).send({ message: 'User does not exist.' });

  const userInfo = {
    id: user[0].id,
    nombre: user[0].nombre,
    email: user[0].email,
  };
  const index = user[0].rowIndex - 2;

  await rows[index].delete();

  return res.send(userInfo);
});

module.exports = router;
