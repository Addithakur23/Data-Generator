import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
import {Dummydata} from "./models/company.js"

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
    origin: "*"

}))

app.use(express.static("public"))

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));


let conn = await mongoose.connect("mongodb://localhost:27017/company")
let name = ["Harry", "Jatin", "Aditya", "Rohan"]
let city = ["New York", "London", "Dubai", "Russia"]
let language = ["Python", "C++", "Javascript", "Java"]

// random values generator
const getrandom = (arr) => {
    let randNo = Math.floor(Math.random() * (arr.length - 1))
    return arr[randNo]
}

app.get('/', (req, res) => {
    res.render("index")
});

app.get('/g', async (req, res) => {

    await Dummydata.deleteMany({})
    let dummyData
    // inserting data into company
    for (let index = 0; index < 10; index++) {
        // random values generator
        let random_boolean = Math.floor(Math.random() * 2)
        let random_salary = Math.floor((Math.random() * 30000 + Math.random() * 100000))
        dummyData =  new Dummydata({ name: getrandom(name), salary: random_salary, city: getrandom(city), language: getrandom(language), isManager: Boolean(random_boolean) })
        await dummyData.save()

    }
    let data = await Dummydata.find({})
    res.json(data)
})

app.listen(port, () => {
    console.log("Hello")
    console.log(`Example app listening on port ${port}`)
})



