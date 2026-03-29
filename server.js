// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());               // Tillåt GET/POST från webben
app.use(express.json());       // JSON body parsing

// Lagra senaste tågdata i minnet
let trains = [];

// POST från Roblox
app.post('/trains', (req, res) => {
    const data = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Skickade inte en lista" });
    }

    trains = data; // uppdatera senaste positioner
    return res.json({ status: "ok" });
});

// GET för webbkartan
app.get('/trains', (req, res) => {
    res.json(trains);
});

// Starta servern
app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});
