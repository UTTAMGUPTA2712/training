const client = require("mongodb").MongoClient
const database = require("mongodb")
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use(express.json())

const mongoString = "mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/"

const mongoclient = client.connect(mongoString).then(database => {
    db = database.db("geo")
    company = db.collection("company")

}).catch(err => console.log(err))
// const db=mongoclient.database("geolocation")
// const company=db.collection("company")

app.get("/", async (req, res) => {
    const data = await company.find({}).toArray()
    res.send(data)
})
app.post("/data", async (req, res) => {
    const { location, distance } = req.body
    console.log(location.coordinates[0], location.coordinates[1], distance);
    try {

        const data = await company.createIndex({ location: "2dsphere" })
        // const data = await company.find({
        //     location:
        //     {
        //         $near:
        //         {
        //             $geometry:
        //             {
        //                 type: "Point",
        //                 coordinates: [location.coordinates[0], location.coordinates[1]]
        //             },
        //             $minDistance: 0,
        //             $maxDistance: distance * 10,
        //         }
        //     }
        // }).toArray()
        // const data2 = await company.aggregate([
        //     {
        //         $geoNear: {
        //             near: { type: "Point", coordinates: [location.coordinates[0], location.coordinates[1]] },
        //             spherical: true,
        //             //   query: { category: "Parks" },
        //             distanceField: "calcDistance"
        //         }
        //     },
        //     // {
        //     //     $match:{
        //     //         distanceField
        //     //     }
        //     // }
        // ]).toArray()
        const data2 = await company.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [location.coordinates[0],location.coordinates[0]] }, $maxDistance:( distance * 1000             )} } }).toArray()
        console.log("data2", data2)
        res.send(data2)
    }
    catch (err) { console.log(err); }
})

app.listen(1000, console.log("working on 1000"))