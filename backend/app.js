const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const DATA_FILE = './data.json';

app.get('/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  res.json(data);
});

app.post('/data', (req, res) => {
  const newData = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8');
  res.status(201).send('Data saved.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
