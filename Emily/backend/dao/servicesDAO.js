import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

//Data Object Model
let services // local variable for whole file so global variable actually

//an async fdgfunction is a specfial type of function that only returns a promise.
//a promise is a peice of code in the function body {} that either is pending,succefully fufilled/executed, or rejected(faoliure or error).
//await can only be used inside an async
export default class ServicesDAO {
 static async injectDB(conn) { //create injectDB function to straight away connect to the hospital collection in our db
   //if hospital db with data exists then return .
   if (services) {
     return
   }
   // then set hospitals to the mongodb env file, sample_hospitals
   try {
   //when await is placed before a method like conn.db() or anyother method,
   //then the entire line of code , in this case hospitals=await conn.db()... , get executed
   //only if the code after await is succesful.(code after await is the method, conn.db()..)
     services = await conn.db(process.env.collection_NS).collection("Service")
   } catch (e) {
     console.error(
       `Unable to establish a collection handle in servicesDAO: ${e}`,
     )
   }
 }

   static async liveEstimatedWaitTime({
      service = null,
      visit = null
    } = {}) { //async function body(promise) starts here
  
    let query //query is a dictionary object. we use this query to filter our searches.
    let serviceId = service.id

    query = { "_id": serviceId }

    try
    {
        service = await services.findOne(query)

        let avgPerPersonWaitTime = service.avgPerPersonWaitTime

        let totalWaitTime = await ServicesDAO.liveEstimatedWaitTimeCalculation({
            avgPerPersonWaitTime,
            numLevel1: service.level1Queue ? service.level1Queue.length : 0,
            numLevel2: service.level2Queue ? service.level2Queue.length : 0,
            numLevel3: service.level3Queue ? service.level3Queue.length : 0,
            priority: 1
        })

        return { liveEstWaitTime: totalWaitTime }
    } catch (e)
    {
        console.error(`Unable to issue find command, ${e}`)
        return { liveEstWaitTime: 0 }
    }

    try {

        console.log(service)
        //
    } catch (e) {
        console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
        return { liveEstWaitTime: 0 }
    }

} //static async liveEstimatedWaitTime


static async liveEstimatedWaitTimeCalculation({
    avgPerPersonWaitTime,
    numLevel1,
    numLevel2,
    numLevel3,
    priority
  } = {}) { //async function body(promise) starts here

  let totalWaitTime = 0

  totalWaitTime = totalWaitTime + avgPerPersonWaitTime * numLevel3

  if(priority <= 2)
  {
      totalWaitTime = totalWaitTime + avgPerPersonWaitTime * numLevel2
  }

  if(priority <= 1)
  {
      totalWaitTime = totalWaitTime + avgPerPersonWaitTime * numLevel1
  }

  return totalWaitTime

} //static async liveEstimatedWaitTimeCalculation

} //class servicesDAO