import mongoose from "mongoose"
const dummyDataSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language: String,
    city: String,
    isManager: Boolean

})

export const Dummydata = mongoose.model("company", dummyDataSchema, "employees")
