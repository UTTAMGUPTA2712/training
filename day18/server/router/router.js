// constants
const userNotFound = "USER NOT FOUND"
const userAlreadyExist = "USER ALREADY EXIST"
const wrongPassword = "INCORRECT PASSWORD"
const success = "SUCCESS"
const APIERROR = "API ERROR"
// api key
const api = "6a426d731db2eecec4965b79870e5aa8"
const mongoString = "mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/weather"
const { MongoClient } = require('mongodb');
// Connection URL
const client = new MongoClient(mongoString);

// Database Name
const dbName = 'weather';

async function main() {
    return 'done.';
}

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const Users = db.collection("Users")
const WeatherData = db.collection("WeatherData")
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
const express = require("express")
const fs = require("fs")
const app = express()
const port = 1000
const cors = require("cors")
// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(cors())
// main page
app.get("/", (req, res) => {
    res.status(200)
    res.send("form")
})
// get data from webpage
app.post("/form", async (req, res) => {
    // checking if file doesnot exist
    const userdata = req.body
    // checking email
    const data = await Users.findOne({ email: userdata.email })
    if (data) {
        // checking password

        if (data.password === userdata.password) {
            res.send(success)
        } else {
            res.send(wrongPassword)
        }
    } else {
        // if user not found
        res.send(userNotFound)
    }
})
// saving users in data,json
app.post("/", async (req, res) => {
    const userdata = req.body
    // checking is user exist
    const data = await Users.findOne({ email: userdata.email })
    if (data) {
        res.send(userAlreadyExist)
    }
    else {
        // save user
        await Users.insertOne(userdata)
        res.send(success)
    }
})
const getData = async (data) => {
    try {
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${api}`)
        return weather.json()
    } catch (err) {
        return APIERROR
    }
}
app.get("/weather/:id", async (req, res) => {
    const param = req.params
    var data = await getData(param.id)
    if (data === APIERROR) {
        WeatherData.findOne({ name: param.id })
            .then(weather => { res.send(weather); })
            .catch(err => { console.log("err", err); res.send("") })
    } else {
        const ans = await WeatherData.findOneAndUpdate({ name: param.id }, { $set: data })
        console.log("ans", ans)
        if (ans.value === null) { await WeatherData.insertOne(data) }
        res.send(data)
    }
})

// server
app.listen(port, console.log(`mongo working, server on ${port}`))