const jwt = require('jsonwebtoken')
require('dotenv').config() // läser in alla variabler i .env

module.exports = (req, res, next) => {
    console.log('auth middleware')
    try {

        // plocka ut jwt ur headern
        const token = req.headers['authorization'].split(' ')[1]

        // Verifisera token och spara anvädarinfo
        const authUser = jwt.verify(token, process.env.JWT_SECRET)
        next()

        // spara anvädarinfo i req
        req.authUser = authUser

        console.log(authUser)
    } catch (err) {
        console.log(err)
        res.status(401).send({
            msg: "Authorization failed",
            error: err.message
        })
    }



}
