const express = require('express');
const cors = require('cors')
const serverless = require('serverless-http');
const insert = require('./insert')

const app = express();
app.use(express.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  try {
    const result = await insert(req.body);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Could not save data. ${error.message}` });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not Found' });
});

exports.api = serverless(app);
