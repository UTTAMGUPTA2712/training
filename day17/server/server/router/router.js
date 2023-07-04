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
// constants
const userNotFound = "USER NOT FOUND"
const userAlreadyExist = "USER ALREADY EXIST"
const wrongPassword = "INCORRECT PASSWORD"
const success = "SUCCESS"
// main page
app.get("/", (req, res) => {
    res.status(200)
    res.send("form")
})
// get data from webpage
app.post("/form", (req, res) => {
    // checking if file doesnot exist
    if (!fs.existsSync("./data.json")) {
        res.send(userNotFound)
        return
    }
    const userdata = req.body;
    let flag = false;
    // reading through file
    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) { throw err }
        const users = JSON.parse(data)
        for (let user of users) {
            // checking email
            if (userdata.email == user.email) {
                flag = true;
                // checking password
                if (userdata.password == user.password) {
                    res.send(success)
                    return
                } else {
                    res.send(wrongPassword)
                    return
                }
            }
        }
        // if user not found
        if (!flag) {
            res.send(userNotFound)
            return
        }
    })
})
// saving users in data,json
app.post("/", (req, res) => {
    // checking if file exist
    if (!fs.existsSync("./data.json")) {
        fs.writeFileSync("./data.json", "[]", "utf8")
    }
    const userdata = req.body
    // reading file
    fs.readFile("./data.json", "utf8", (err, data) => {
        if (err) {
            throw err
        }
        // checking is user exist
        var users = (data.length>0)?JSON.parse(data):[]
        for (let user of users) {
            if (user.email == userdata.email) {
                res.send(userAlreadyExist)
                return
            }
        }
        // save user
        users.push(userdata)
        fs.writeFile("./data.json", JSON.stringify(users), err => {
            if (err) { throw err }
            res.send(success)
            return
        })
    })
})
// server
app.listen(port, console.log("working"))