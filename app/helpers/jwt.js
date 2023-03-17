import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

function generateToken(payload){
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

function verifyToken(token){
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
}

export {
    generateToken,
    verifyToken
}