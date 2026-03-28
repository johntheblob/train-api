const express = require("express")
const app = express()

app.use(express.json())

let trains = []

app.post("/trains", (req, res) => {
    trains = req.body
    res.sendStatus(200)
})

app.get("/trains", (req, res) => {
    res.json(trains)
})

app.listen(3000, () => {
    console.log("Running")
})