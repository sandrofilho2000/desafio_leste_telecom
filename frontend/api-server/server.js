const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/contacts', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/contacts`, {
      headers: {
        Authorization: `Api-Key ${API_KEY}`,
      },
      params: req.query,
    });
    res.json(response.data);
  } catch (error) {
    console.error('Req failed!:', error);
    res.status(500).json({ error: 'Req failed!' });
  }
});

app.post('/api/create_contact', async (req, res) => {
  const formData = req.body;

  try {
    const headers = {
      Authorization: `Api-Key ${API_KEY}`,
    };

    const response = await axios.post(`${API_URL}/create_contact/`, formData, {
      headers,
    });

    res.status(200).json({ message: 'Contact created successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error creating contact' });
  }
});

app.post('/api/update_contact/:contact_id', async (req, res) => {
  const { contact_id } = req.params;
  const formData = req.body;

  try {
    const headers = {
      Authorization: `Api-Key ${API_KEY}`,
    };

    const response = await axios.post(
      `${API_URL}/update_contact/${contact_id}/`,
      formData,
      { headers }
    );

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    console.error('Req failed!:', error.message);
    res.status(500).json({ error: 'Req failed!' });
  }
});

app.delete('/api/delete_contact/:contact_id/', async (req, res) => {
  try {
    const { contact_id } = req.params;
    console.log('🚀 ~ file: index.js:124 ~ contact_id:', contact_id);
    const response = await axios.delete(
      `${API_URL}/delete_contact/${contact_id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Api-Key ${API_KEY}`,
        },
      }
    );
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Req failed!:', error.message);
    res.status(500).json({ error: 'Req failed!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
