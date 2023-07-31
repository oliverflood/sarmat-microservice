const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 56709;

app.use(bodyParser.json());

// handle the HTTP POST request and pick a random characterId
app.post('/pick-character', (req, res) => {
    const characters = req.body.characters;
    if (!characters || !Array.isArray(characters)) {
        return res.status(400).json({ error: 'Invalid input format. Expected an array of characters with weights.' });
    }

    const totalWeight = characters.reduce((acc, character) => acc + character.weight, 0);

    const randomWeight = Math.random() * totalWeight;

    // pick the character based on the randomWeight
    let accumulatedWeight = 0;
    let selectedCharacter;
    for (const character of characters) {
        accumulatedWeight += character.weight;
        if (randomWeight < accumulatedWeight) {
            selectedCharacter = character;
            break;
        }
    }

    if (!selectedCharacter) {
        return res.status(500).json({ error: 'Internal server error. Failed to pick a character.' });
    }

    res.json({ characterId: selectedCharacter.characterId });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
