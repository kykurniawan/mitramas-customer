import axios from "axios"

const fetcher = (url, token) => {
    return axios.get(url, {
        headers: {
            Authorization: token ? token : ''
        }
    }).then(res => res.data)
}

export default fetcher