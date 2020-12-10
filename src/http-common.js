import axios from "axios";
const DEV_URI = "http://localhost:8000/api/v1";
const PROD_URI = 'https://rocky-sierra-44664.herokuapp.com/api/v1';

export default axios.create({
    baseURL: PROD_URI,
    headers: {
        "Content-Type": "application/json"
    }
})
