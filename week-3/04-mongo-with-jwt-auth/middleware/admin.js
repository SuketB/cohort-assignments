// Middleware for handling auth
const jwt = require("jsonwebtoken")
const { Admin } = require("../db")

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const authorizationHeader = req.headers.authorization
    console.log(req.headers)
    if(!authorizationHeader || !authorizationHeader.startsWith("Bearer")) res.status(401).json({message: "Not Authorized"})
    const [bearer, token] = authorizationHeader.split(' ')
    jwt.verify(token, "secret",async (err, decodedToken) => {
        if(err){
            res.status(401).json({message: "Not Authorized"})
        }
        else{
            const admin = await Admin.findById(decodedToken.id)
            if(admin){
                req.headers.username=  admin.username
                req.headers.password = admin.password
                next()
            }
            else{
                res.status(401).json({ message: 'Not Authorized' })
                return
            }
        }
    })

}

module.exports = adminMiddleware;