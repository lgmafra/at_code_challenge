import axios from 'axios'

const localApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1/genre/'
})

export default localApi
