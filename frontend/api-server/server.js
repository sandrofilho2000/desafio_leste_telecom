// backend-server/server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/api/contacts', async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Api-Key ${API_KEY}`,
      },
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Erro na requisição:', error);
    res.status(500).json({ error: 'Erro na requisição' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
