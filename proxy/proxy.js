const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000; // Set the port you want to use

app.use(express.json());

app.use((req, res, next) => {
  // Enable CORS - Replace * with the specific origins you want to allow
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const externalServerUrl = `https://cybertracker-50ev.onrender.com/user/${userId}`;

  try {
    const response = await axios.get(externalServerUrl, {
        headers: {
            'ngrok-skip-browser-warning' : '3243'
        }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
