// Installera först:
// npm init -y
// npm install express cors

const express = require("express");
const cors = require("cors");
const app = express();

// ✅ Aktivera CORS så att GitHub Pages eller andra webbplatser kan läsa API
app.use(cors());

// Exempeldata: Byt ut eller lägg till fler tåg här
let trains = [
    { id: "Test", x: 1508.2485, z: -2206.5456 }
];

// Endpoint som returnerar tågdata
app.get("/trains", (req, res) => {
    res.json(trains);
});

// Port från Render eller lokal default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
