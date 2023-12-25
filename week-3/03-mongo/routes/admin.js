const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body
    const admin = new Admin({username, password})
    admin.save().then(() => res.json({ message: 'Admin created successfully' }))
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const {title, description, imageLink, price} = req.body
    const course = new Course({title, description, imageLink, price})
    course.save().then((newCourse) =>
      res.status(201).json({
        message: 'Course created successfully',
        courseId: newCourse._id,
      })
    )
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find()
    res.status(200).json(courses)
});

module.exports = router;