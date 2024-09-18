import axios from 'axios';

export const getData = async (url) => {
    let result = await axios.get(`${url}`)
    return result
}