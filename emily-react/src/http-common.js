import axios from "axios";
export default axios.create({
baseURL : "http://localhost:5000/api/v1" , // this links to our server.js file and in it we set this api call. this is the base URL
headers:{
    "Content-type":"application/json"
}
});