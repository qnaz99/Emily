//we can use whatever index.js file. this is just a boiler plate i used.

import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import hospitalsDAO from "./dao/hospitalsDAO.js"
import servicesDAO from "./dao/servicesDAO.js"
import userDAO from "./dao/userDAO.js"
// import realTempDAO from "./dao/realTempDAO.js"
// import usersDAO from "./dao/usersDAO.js.js" //will make this later

dotenv.config()

const MongoClient=mongodb.MongoClient
const port = process.env.port || 8000 //port is set to 5000 or 8000

MongoClient.connect(
//sets the database limits


    process.env.DB_URI,
    {
        maxpoolSize: 50, //max of 50 entries
        wtimeoutMS : 2500, //2500ms is request/response time
        useNewUrlParser : true 

    }
).catch(err=> {

    console.error(err.stack)
    process.exit(1)
}).then (async client=>{

await hospitalsDAO.injectDB(client)
await servicesDAO.injectDB(client)
await userDAO.injectDB(client)

// await realTempDAO.injectDB(client)
// await usersDAO.injectDB(client) //will make this later
app.listen(port,()=>{

    console.log(`listening on port ${port}`)
})

})