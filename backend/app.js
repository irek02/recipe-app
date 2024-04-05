const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const RECIPE_FILE = './recipes.json';

app.get('/recipes', (req, res) => {
  const data = JSON.parse(fs.readFileSync(RECIPE_FILE, 'utf8'));
  res.json(data);
});

app.post('/recipes', (req, res) => {
  const newRecipe = { ...req.body, id: uuidv4() };
  const recipes = JSON.parse(fs.readFileSync(RECIPE_FILE, 'utf8'));
  recipes.push(newRecipe);
  fs.writeFileSync(RECIPE_FILE, JSON.stringify(recipes, null, 2), 'utf8');
  res.status(201).json({ message: 'Recipe created successfully', id: newRecipe.id });
});

app.delete('/recipes/:id', (req, res) => {
  const recipeId = req.params.id;
  let recipes = JSON.parse(fs.readFileSync(RECIPE_FILE, 'utf8'));

  const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    fs.writeFileSync(RECIPE_FILE, JSON.stringify(recipes, null, 2), 'utf8');
    res.json({ message: 'Recipe deleted successfully' });
  } else {
    res.status(404).json({ message: 'Recipe not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
