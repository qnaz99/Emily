//change this to whatever you want. change the port number to the raspberry pis port numberimport express from "express"
import express from "express"

import cors from "cors"
import hospitals from "./api/emily.route.js"
// import realTemp from "./api/router.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",hospitals) //DISPLAYS all the units once you go on the url of http://localhost:{port_number}/api/vi

app.use("*",(req,res)=>res.status(404).json({error:'not found'}))

export default app //need to export this for use