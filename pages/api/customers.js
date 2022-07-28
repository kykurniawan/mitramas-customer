import axios from "axios"

const url = process.env.URL

const getCustomers = async (token) => {
  try {
    const response = await axios.get(url + '/customers', {
      headers: {
        'Authorization': token
      }
    })
    return response.data.data
  } catch (error) {
    console.error(error)
    return null
  }
}

const createCustomer = async (token, customer) => {
  try {
    const response = await axios.post(url + '/customers', customer, {
      headers: {
        'Authorization': token
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

const updateCustomer = async (token, customer) => {
  try {
    const response = await axios.put(url + '/customers', customer, {
      headers: {
        'Authorization': token
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

const deleteCustomer = async (token, id) => {
  console.log("token adalah: " + token)
  try {
    const response = await axios.delete(url + '/customers', {
      headers: {
        'Authorization': token
      },
      data: {
        id: id
      }
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}

export default async function handler(req, res) {
  const { method } = req
  const { authorization } = req.headers

  if (method === 'GET') {
    let customers = await getCustomers(authorization)
    return res.json({
      success: true,
      customers: customers
    })
  }

  if (method === 'POST') {
    let result = await createCustomer(authorization, req.body)
    if (!result) {
      return res.json({ success: false })
    }
    return res.json(result)
  }

  if (method === 'PUT') {
    let result = await updateCustomer(authorization, req.body)
    if (!result) {
      return res.json({ success: false })
    }
    return res.json(result)
  }

  if (method === 'DELETE') {
    let result = await deleteCustomer(authorization, req.body.id)
    if (!result) {
      return res.json({ success: false })
    }
    return res.json(result)
  }
}
