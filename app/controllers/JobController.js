import helper from "../helpers/helper.js"
import axios from "axios"

const Get = async (req, res) => {
  try {
    let url = 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json'

    if (req.query) {
      Object.entries(req.query).forEach(([key, value], index) => {
        url += `${index === 0 ? '?' : '&'}${key}=${value}`
      });
    }

    const responseGetJob = await axios.get(url)

    res.status(200).json(helper.ResponseBody(false, 'success', responseGetJob.data))
  } catch (error) {
    res.status(500).json(helper.ResponseBody(true, error.message))
  }
}

const GetById = async (req, res) => {
  try {
    const id = req.params.id
    let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`

    const responseGetJob = await axios.get(url)

    res.status(200).json(helper.ResponseBody(false, 'success', responseGetJob.data))
  } catch (error) {
    res.status(500).json(helper.ResponseBody(true, error.message))
  }
}

export default {
  Get,
  GetById
}