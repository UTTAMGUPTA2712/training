
port = 1000
getCartItems = "getCartItems"
loginService = "loginService"
saveItem = "saveItem"
signUpService = "signUpService"
updateProfile = "updateProfile"
updateUserTransaction = "updateUserTransaction"
updateVendorSale = "updateVendorSale"
mongoString = "mongodb+srv://uttam_gupta:Qazwsx55@cluster0.et4nl6t.mongodb.net/"
userCollection = "userCollection"
ItemsCollection = "ItemsCollection"
ShopDb = "shopDay19"
userNotFound = "USER NOT FOUND"
userAlreadyExist = "USER ALREADY EXIST"
wrongPassword = "INCORRECT PASSWORD"
success = "SUCCESS"
publishItem="publishItem"
deletItem="deletItem"
const express=require("express")
const app=express()
const {MongoClient}=require("mongodb")
const objectid=require("mongodb").ObjectId
const cors=require("cors")
// const { port, mongoString, ShopDb, userCollection, ItemsCollection, signUpService, loginService, getCartItems, saveItem, updateProfile, userNotFound, wrongPassword, success, userAlreadyExist } = require("./constants")
const client=new MongoClient(mongoString)


// connection to mongodb
async function main() {
    return 'done.';
}
main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

client.connect()
console.log('Connected successfully to MongoDB');
const db=client.db(ShopDb)
const Users=db.collection(userCollection)
const Items=db.collection(ItemsCollection)

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())
app.use(cors())

// apis

app.post(`/${loginService}`,  async (req, res) => {
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
app.post(`/${signUpService}`,  async (req, res) => {
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
app.get(`/${getCartItems}`, async (req, res)=>{
    const getItem=await Items.find({}).toArray()
    res.send(getItem)
})
app.post(`/${saveItem}`, async (req, res)=>{
    const data=req.body
    const sendItem=await Items.insertOne(data)
    res.send(sendItem)
})
app.post(`/${updateProfile}`, async (req, res)=>{
    const data=req.body
    const update=await Users.updateOne({ email: data.email }, {$set:data})
    console.log(update)
    res.send(update)
})

app.post(`/${publishItem}`, async (req, res)=>{
    const data=req.body
    console.log("data",data)
    const update=await Items.updateOne({ _id: new objectid(data.id) }, {$set:{published:true}}).then(res=>console.log("publish",res)).catch(err=>console.log(err))
    res.send(update)
    
})
app.post(`/${deletItem}`, async (req, res)=>{
    const data=req.body
    console.log("data",data)
    const update=await Items.updateOne({ _id: new objectid(data.id) }, {$set:{user:null}}).then(res=>console.log("update",res)).catch(err=>console.log(err))
    console.log(update)
    res.send(update)
})
// app.get(`/`, async (req, res)=>
// })
// app.get(`/`, async (req, res)=>{
    
// })
// app.get(`/`, async (req, res)=>{
    
// })
// app.post(`/`, async (req, res)=>{
    
// })
// app.post(`/`, async (req, res)=>{
    
// })
// app.post(`/`, async (req, res)=>{
    
// })
// app.post(`/`, async (req, res)=>{
    
// })
// app.post(`/`, async (req, res)=>{
    
// })
// server
app.listen(port,console.log(`port listening on ${port}`))
