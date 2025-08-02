import express from "express"
import mongoose from "mongoose"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors({origin:"*"})) 
const port = 3000
const dummyDataSchema=new mongoose.Schema({
    name:String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean

})

const Dummydata=mongoose.model("company",dummyDataSchema,"employees")

let conn = await mongoose.connect("mongodb://localhost:27017/company")
let name = ["Harry", "Jatin", "Aditya","Rohan"]
let city = ["New York", "London", "Dubai","Russia"]
let language = ["Python", "C++", "Javascript","Java"]

const getrandom=(arr)=>{
   let  randNo=Math.floor(Math.random()*(arr.length-1))
    return arr[randNo]
}

app.post('/g', async (req, res) => {  
    // console.log("Reached post request")
    // random values generator
    
    await Dummydata.deleteMany({})
    let dummyData 
    // inserting data into company
    for (let index = 0; index < 10; index++) {
        let random_boolean = Math.floor(Math.random()*2)
        let random_salary = Math.floor((Math.random() * 30000 + Math.random() * 100000))  
        dummyData = new Dummydata({ name: getrandom(name), salary: random_salary, city: getrandom(city), language: getrandom(language), isManager:Boolean(random_boolean)}) 
        await dummyData.save() 
        
    }
    let data=await Dummydata.find({})
    
       
    res.json(data)
 
 
}) 

 

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`)
})



 