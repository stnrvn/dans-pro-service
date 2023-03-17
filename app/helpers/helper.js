import db from '../config/db.js'

const ResponseBody = (error, message, data = {}) => {
    return {
        error,
        message,
        data
    }
}

const MysqlExecute = async query => {
    let conn = null
    try {
        conn = await db.getConnection()
        const [rows] = await conn.execute(query)
        conn.release()
        return ResponseBody(false, '', rows)
    } catch (error) {
        if (conn) conn.release()
        throw new Error(error)
    }
}

export default {
  ResponseBody,
  MysqlExecute
}