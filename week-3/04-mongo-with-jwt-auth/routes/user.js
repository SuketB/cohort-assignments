const { Router } = require('express')
const router = Router()
const userMiddleware = require('../middleware/user')
const { User, Course } = require('../db')
const jwt = require('jsonwebtoken')

// User Routes
router.post('/signup', (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body
  const user = new User({ username, password })
  user.save().then(() => res.json({ message: 'User created successfully' }))
})

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find()
  res.status(200).json(courses)
})

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const { courseId } = req.params
  const { username } = req.headers
  const user = await User.findOne({ username: username })
  const course = await Course.findById(courseId)
  user.purchasedCourses.push(course)
  const newUser = await user.save()
  res.json({ message: 'Course purchased successfully' })
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const { username } = req.headers
  const user = await User.findOne({ username: username }).populate(
    'purchasedCourses'
  )
  res.json(user.purchasedCourses)
})

router.post('/signin',async  (req, res) => {
  // Implement admin signup logic
  const {username, password} = req.body
  const user = await User.findOne({username: username})
  if (user && user.password === password) {
    let token = jwt.sign({id: user._id}, 'secret')
    res.status(200).json({ token: token, message: 'Successful login' })
  } else res.status(401).json({ message: 'Wrong username/password' })
})


module.exports = router
