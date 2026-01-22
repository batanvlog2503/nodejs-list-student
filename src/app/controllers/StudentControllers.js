const Student = require("../models/Student")
const slugify = require("slugify")
const Counter = require("../models/Counter")
const {
  multipleMongooseToObject,
  mongooseToObject,
} = require("../../config/util/mongoose")
class StudentControllers {
  //[GET] /students/show
  async show(req, res, next) {
    try {
      const students = await Student.find({})

      if (!students) {
        res.status(404).render("error/404")
      }

      res.render("students/viewAllStudents", {
        student: multipleMongooseToObject(students),
      })
    } catch (error) {
      next(error)
    }
  }
  // render UI form
  // [GET] /students/create
  create(req, res, next) {
    res.render("students/addStudent")
  }

  // [POST] /students/add
  async add(req, res, next) {
    try {
      const formData = req.body

      formData.slug = slugify(req.body.name, { lower: true, strict: true })
      const counter = await Counter.findOneAndUpdate(
        { name: "studentId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      )

      formData.id = counter.seq

      const student = new Student(formData)
      await student.save()

      res.redirect("/students/view")
    } catch (error) {
      next(error)
    }
  }
  // [GET] /students/:id/edit
  async edit(req, res, next) {
    try {
      const student = await Student.findById(req.params.id)

      if (!student) {
        res.status(404).render("error/404")
      }

      res.render("students/editStudent", { student: mongooseToObject(student) })
    } catch (error) {
      next(error)
    }
  }

  // [PUT] /students/:id
  async update(req, res, next) {
    try {
      const formData = req.body
      const student = await Student.updateOne({ _id: req.params.id }, formData)

      res.redirect("/students/view") // khi render là hiện cái đi đến failed
      // còn redirect là đi theo đường link URL
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new StudentControllers()
