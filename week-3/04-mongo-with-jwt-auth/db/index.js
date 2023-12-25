const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/courses')

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

const UserSchema = new mongoose.Schema({
  // Schema definition here
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})

const CourseSchema = new mongoose.Schema({
  // Schema definition here
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imageLink: {
    type: String,
    require: true,
  },
})

const Admin = mongoose.model('Admin', AdminSchema)
const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)

module.exports = {
  Admin,
  User,
  Course,
}
