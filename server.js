// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporär datalagring (i minnet)
let trains = [];

// POST från Roblox
app.post('/trains', (req, res) => {
    const data = req.body;

    // Enkel validering
    if (!Array.isArray(data)) return res.status(400).send("Skickade inte en lista");
    trains = data; // uppdatera senaste tågpositioner
    res.send({status:"ok"});
});

// GET för webbkartan
app.get('/trains', (req, res) => {
    res.json(trains);
});

app.listen(PORT, () => {
    console.log(`Servern körs på port ${PORT}`);
});
