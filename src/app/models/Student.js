const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StudentSchema = new Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, maxLength: 100 },
    msv: { type: String, unique: true, maxLength: 100 },
    class: { type: String, maxLength: 100 },
    hometown: { type: String, maxLength: 100 },
    address: { type: String, maxLength: 100 },
    department: { type: String, maxLength: 100 },
    gpa: { type: String, maxLength: 30 },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Student", StudentSchema)
