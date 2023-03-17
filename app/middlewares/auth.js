import { verifyToken } from '../helpers/jwt.js'
import helper from "../helpers/helper.js"

async function authenticate(req, res, next){
    try {
        let decoded = verifyToken(req.headers.access_token)

        const resultFindUser = await helper.MysqlExecute(`
          SELECT * FROM users WHERE email = '${decoded.email}'
        `)

        if(!resultFindUser.error){
            req.user = resultFindUser.data[0]
            next()
        } else {
            return res.status(401).json(helper.ResponseBody(true, 'Please login first!'))
        }
    } catch (error) {
        res.status(500).json(helper.ResponseBody(true, error.message))
    }
}

export {
  authenticate
}