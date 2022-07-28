import cookie from 'cookie'
import axios from "axios"

const url = process.env.URL

const login = async () => {
    try {
        const response = await axios.post(url + '/auth/login', {
            email: process.env.EMAIL,
            password: process.env.PASSWORD
        })
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export default async function handler(req, res) {
    const { method } = req
    if (method === 'POST') {
        const data = await login()
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', data.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 86400,
                path: '/'
            })
        )
        res.statusCode = 200
        return res.json({ success: true, token: data.access_token })
    }

    return res.json({ success: false })
}