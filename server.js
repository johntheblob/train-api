
const express = require("express");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());


let trains = [];


app.post("/trains", (req, res) => {
    trains = req.body;
    console.log("Received trains:", trains);
    res.sendStatus(200);
});


app.get("/trains", (req, res) => {
    res.json(trains);
});


app.get("/", (req, res) => {
    res.send("Train API is running 🚆");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
