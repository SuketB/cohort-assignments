const { User } = require("../db")
const jwt = require("jsonwebtoken")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer'))
      res.status(401).json({ message: 'Not Authorized' })
    const [bearer, token] = authorizationHeader.split(' ')
    jwt.verify(token, 'secret', async (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Not Authorized' })
      } else {
        const user = await User.findById(decodedToken.id)
        if (user) {
          req.headers.username = user.username
          req.headers.password = user.password
          next()
        } else {
          res.status(401).json({ message: 'Not Authorized' })
          return
        }
      }
    })

}

module.exports = userMiddleware;