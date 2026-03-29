// server.js – stabil version för Render
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // async version
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = './trains.json';

// Initiera trains från fil (om filen finns)
let trains = [];
(async () => {
    try {
        const content = await fs.readFile(DATA_FILE, 'utf8');
        trains = JSON.parse(content);
        console.log("Laddade tågdata från fil.");
    } catch(e) {
        console.log("Ingen tidigare tågdata hittad, startar med tom lista.");
        trains = [];
    }
})();

// POST från Roblox
app.post('/trains', async (req, res) => {
    try {
        const data = req.body;
        if (!Array.isArray(data)) return res.status(400).json({ error: "Skickade inte en lista" });

        trains = data;

        // Skriv till fil (backup)
        await fs.writeFile(DATA_FILE, JSON.stringify(trains));
        console.log("Uppdaterade tågdata:", trains.length, "tåg");

        res.json({ status: "ok" });
    } catch (err) {
        console.error("Fel vid POST /trains:", err);
        res.status(500).json({ error: "Serverfel" });
    }
});

// GET för webbkartan
app.get('/trains', (req, res) => {
    try {
        res.json(trains);
    } catch (err) {
        console.error("Fel vid GET /trains:", err);
        res.status(500).json({ error: "Serverfel" });
    }
});

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
