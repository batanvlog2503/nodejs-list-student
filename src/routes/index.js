const express = require("express")
const router = express.Router()
const siteRouter = require("./site")
const studentRouter = require("./student")
function route(app) {
  app.use("/", siteRouter)
  app.use("/students", studentRouter)
}
module.exports = route
