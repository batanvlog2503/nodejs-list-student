// khởi tạo express
const express = require("express")
// khởi tạo morgan lấy logger từ request
const morgan = require("morgan")
// tạo đường dẫn
const path = require("path")
// tạo router
const route = require("./routes")
// sử dựng handlebars
const { engine } = require("express-handlebars")
// khởi tạo app
const app = express()
// khởi tạo port
const port = 3000
// connect db

const db = require("./config/db")
db.connect()

const methodOverride = require("method-override")
const helpers = require("./helpers/helpers")
// sử dụng được file scss file tĩnh
app.use(express.static(path.join(__dirname, "public"))) // sử dụng file tĩnh xuất ra
app.use(morgan("combined"))

// sử dụng methodOverrider

app.use(methodOverride("_method"))
// template engine setup

app.use(express.urlencoded({ extended: true })) // cho phép đọc form
app.use(express.json()) // cho phép đọcjson

app.engine("hbs", engine({ extname: ".hbs", helpers: helpers }))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "resources", "views"))
// path view
console.log("Views path: ", path.join(__dirname, "resources\\views"))
console.log("Static path:", path.join(__dirname, "public"))
app.listen(port, () =>
  console.log("example app listening at http://localhost:3000"),
)

route(app)
