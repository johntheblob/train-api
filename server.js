// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Läsa/skriva JSON-fil som backup
const DATA_FILE = './trains.json';

// Initiera trains
let trains = [];
if (fs.existsSync(DATA_FILE)) {
    try {
        trains = JSON.parse(fs.readFileSync(DATA_FILE));
    } catch(e){ trains = []; }
}

// POST från Roblox
app.post('/trains', (req, res) => {
    const data = req.body;
    if (!Array.isArray(data)) return res.status(400).json({ error: "Skickade inte en lista" });

    trains = data;

    // Skriv till fil (backup)
    fs.writeFile(DATA_FILE, JSON.stringify(trains), (err) => {
        if (err) console.warn("Kunde inte spara data: ", err);
    });

    res.json({ status: "ok" });
});

// GET för webbkartan
app.get('/trains', (req, res) => {
    res.json(trains);
});

app.listen(PORT, () => console.log(`Servern körs på port ${PORT}`));
