const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const recipesFilePath = './data/recipes.json';

// Read recipes
app.get('/api/recipes', (req, res) => {
    fs.readFile(recipesFilePath, (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Create a recipe
app.post('/api/recipes', (req, res) => {
    const newRecipe = req.body;
    fs.readFile(recipesFilePath, (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        const recipes = JSON.parse(data);
        recipes.push(newRecipe);
        fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(201).json('Recipe added successfully');
        });
    });
});

// Delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile(recipesFilePath, (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        let recipes = JSON.parse(data);
        recipes = recipes.filter(recipe => recipe.id !== id);
        fs.writeFile(recipesFilePath, JSON.stringify(recipes, null, 2), (err) => {
            if (err) {
                res.status(500).json(err);
                return;
            }
            res.status(200).json('Recipe deleted successfully');
        });
    });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
