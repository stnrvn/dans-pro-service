import { comparePassword, hashPassword } from "../helpers/bcrypt.js"
import { generateToken } from "../helpers/jwt.js"
import helper from "../helpers/helper.js"
import { v4 as uuidv4 } from 'uuid'

const Register = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body
    const newUserId = uuidv4()
    const newPassword = hashPassword(password)

    const insertUser = await helper.MysqlExecute(`
      INSERT INTO users (id, email, password)
      VALUES ('${newUserId}', '${email}', '${newPassword}')
    `)

    if (insertUser.error) {
      return res.status(206).json(helper.ResponseBody(true, `Failed, to register: ${insertUserDetail.message}`))
    }

    res.status(200).json(helper.ResponseBody(false, 'success'))
  } catch (error) {
    res.status(500).json(helper.ResponseBody(true, error.message))
  }
}

const SignIn = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body

    const resultFindUser = await helper.MysqlExecute(`
      SELECT * FROM users WHERE email = '${email}'
    `)

    if(resultFindUser.data.length === 0){
      return res.status(401).json(helper.ResponseBody(true, `Invalid username / password`))
    }
    
    const dataUser = resultFindUser.data[0]

    const match = comparePassword(password, dataUser.password)

    if(match){
      const payload = {
        id: dataUser.id,
        email: dataUser.email
      }

      const access_token = generateToken(payload)

      res.status(200).json(helper.ResponseBody(false, access_token))
    } else {
      return res.status(401).json(helper.ResponseBody(true, `Invalid username / password`))
    }
  } catch (error) {
    res.status(500).json(helper.ResponseBody(true, error.message))
  }
}

export default {
  Register,
  SignIn
}