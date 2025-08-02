import express from "express"
import mongoose from "mongoose"
import cors from "cors"


const app = express()
app.use(express.json())
const port = 3000
const dummyDataSchema=new mongoose.Schema({
    name:String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean

})

const Dummydata=mongoose.model("company",dummyDataSchema,"employees")
app.use(cors())
let conn = await mongoose.connect("mongodb://localhost:27017/company")
let name = ["Harry", "Jatin", "Aditya"]
let city = ["New York", "London", "Dubai"]
let language = ["English", "Hindi", "Arabic"]


app.get('/g', async (req, res) => {  
    // random values generator
    let random_boolean = Math.floor(Math.random()*2)
    let random_salary = Math.floor((Math.random() * 30000 + Math.random() * 100000))  
    let random = Math.floor((3 * Math.random()))

    await Dummydata.deleteMany({})
    // inserting data into company
    const dummyData = new Dummydata({ name: name[random], salary: random_salary, city: city[random], language: language[random], isManager:Boolean(random_boolean)}) 
    await dummyData.save() 
    await Dummydata.find({})
    res.json(dummyData)
 
}) 

 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



 