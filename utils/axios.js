import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://localhost:3000/api/'   // Dev
    baseURL: 'https://www.trythemenu.com/api/' // Production
})

export default instance;