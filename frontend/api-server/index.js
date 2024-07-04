const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const FormData = require('form-data');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ storage: multer.memoryStorage() });

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

app.post(
  '/api/update_contact/:contact_id',
  upload.single('avatar'),
  async (req, res) => {
    const { contact_id } = req.params;
    const formData = req.body;
    const avatarFile = req.file;

    const formDataToSend = new FormData();
    formDataToSend.append('first_name', formData.first_name);
    formDataToSend.append('last_name', formData.last_name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('birthdate', formData.birthdate);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('language', formData.language);

    if (avatarFile) {
      const avatarData = fs.createReadStream(avatarFile.path);
      formDataToSend.append('avatar', avatarData, {
        filename: avatarFile.originalname,
        contentType: avatarFile.mimetype,
      });
    }
    try {
      const response = await axios.post(
        `${API_URL}/update_contact/${contact_id}/`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Api-Key ${API_KEY}`,
          },
        }
      );

      res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
      console.error('Req failed!:', error.message);
      res.status(500).json({ error: 'Req failed!' });
    }
  }
);

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

app.post('/api/create_contact', upload.single('avatar'), async (req, res) => {
  const formData = req.body;
  const avatar = req.file;

  console.log('🚀 ~ file: index.js:35 ~ formData:', formData);
  console.log('🚀 ~ file: index.js:37 ~ avatar:', avatar);

  try {
    const headers = {
      Authorization: `Api-Key ${process.env.API_KEY}`,
    };

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (avatar) {
      formDataToSend.append('avatar', avatar.buffer, avatar.originalname);
    }

    const response = await axios.post(
      `${process.env.API_URL}/create_contact/`,
      formDataToSend,
      {
        headers: {
          ...headers,
          ...formDataToSend.getHeaders(),
        },
      }
    );

    res.status(200).json({ message: 'Contact created successfully' });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ error: 'Error creating contact' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
