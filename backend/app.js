const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors());

const RECIPE_FILE = './recipes.json';

app.get('/recipes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(RECIPE_FILE, 'utf8'));
  res.json(data);
});

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  const recipes = JSON.parse(fs.readFileSync(RECIPE_FILE, 'utf8'));
  recipes.push(newRecipe);
  fs.writeFileSync(RECIPE_FILE, JSON.stringify(recipes, null, 2), 'utf8');
  res.status(201).json({ message: 'Recipe created successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
