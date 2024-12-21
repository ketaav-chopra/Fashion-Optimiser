const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.get('/get-api-key', (req, res) => {
  const apiKey = process.env.API_KEY; // Store API key securely in an environment variable
  res.json({ apiKey });
});

app.post('/analyze-image', async (req, res) => {
  const { image } = req.body; // Expect the image data
  const apiKey = process.env.API_KEY; // Fetch API key from environment

  const response = await fetch('https://api.example.com/analyze', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: image,
  });

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
