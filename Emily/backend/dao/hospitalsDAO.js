import mongodb from "mongodb"
import ServicesDAO from "./servicesDAO.js"
const ObjectId = mongodb.ObjectId

//Data Object Model
let hospitals // local variable for whole file so global variable actually

//an async fdgfunction is a specfial type of function that only returns a promise.
//a promise is a peice of code in the function body {} that either is pending,succefully fufilled/executed, or rejected(faoliure or error).
//await can only be used inside an async
export default class HospitalsDAO {
 static async injectDB(conn) { //create injectDB function to straight away connect to the hospital collection in our db
   //if hospital db with data exists then return .
   if (hospitals) {
     return
   }
   // then set hospitals to the mongodb env file, sample_hospitals
   try {
   //when await is placed before a method like conn.db() or anyother method,
   //then the entire line of code , in this case hospitals=await conn.db()... , get executed
   //only if the code after await is succesful.(code after await is the method, conn.db()..)
     hospitals = await conn.db(process.env.collection_NS).collection("Hospital")
   } catch (e) {
     console.error(
       `Unable to establish a collection handle in hospitalsDAO: ${e}`,
     )
   }
 }

 static async getHospitals({
     //these are the parameters for our getHospital function
   filters = null, //this is for searching particular keywords in hospital database
   page = 0, //this is for indicating the page number in our searches. set to 0 default
   hospitalsPerPage = 20, //this is the limit of how many hospitals to display per paage
 } = {}) { //async function body(promise) starts here
   let query //query is a dictionary object. we use this query to filter our searches.
   if (filters) {
     if ("name" in filters) {
       query = { $text: { $search: filters["name"] } }
     } else if ("address" in filters) {
         //$eq is a mongodb functionality that is a equal method.
         //query is a SPECEFIC SELECTOR that needs to be paired with the find method to do the searching/filtering
         //so when we do db.find(query) we are doing db.find{'address': $eq:American })
       //filter['cusine'] is just an array containing the specefic cusine we want like for example American
       query = { "address": { $eq: filters["address"] } }
     } else if ("service" in filters) {
       query = { "service": { $eq: filters["service"] } }
     }
   }

   let cursor
   
   try {
     cursor = await hospitals
       .find(query) //we then find and return all database documents/data that have our selector(query is a unique selector we defined earlier)
   } catch (e) {
     console.error(`Unable to issue find command, ${e}`)
     return { hospitalsList: [], totalNumHospitals: 0 }
   }

   //cursor holds all our unique database documents we filtered with query.
   //but displayCursor further filters the cursor, by the parameters of restaruatantsperpage and page number
   const displayCursor = cursor.limit(hospitalsPerPage).skip(hospitalsPerPage * page) //skip enables us to skip to the document that corresponds to our selected page and our default resultsperpage variable

   try {
       //converts all our displayed data to an array
     const hospitalsList = await displayCursor.toArray()
   //   counts the documents in cursor
     const totalNumHospitals = await hospitals.countDocuments(query)

     return { hospitalsList, totalNumHospitals }
   } catch (e) {
     console.error(
       `Unable to convert cursor to array or problem counting documents, ${e}`,
     )
     return { hospitalsList: [], totalNumHospitals: 0 }
   }
 }//static async get hospitals

 //THIS DATAPIPLE AGGREGATION MODEL we will describe it later
 //Important. this not only gets the hospital basic details(like all the data labels/fields of the hospital schema but also gets all the reviews of that hospital)
 static async getHospitalByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews", //gets all the reviews from that hospital
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$hospital_id", "$$id"],
                                  },
                              },
                          },
                          {
                             $sort: {
                                  date: -1,
                              },
                          },
                      ],
                    as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await hospitals.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getHospitalByID: ${e}`)
      throw e
    }
  }


//method to get all possible locations from database.
static async getLocations() {
    let locations = [] //store in array
    try {
      locations = await hospitals.distinct("address") //distinct function returns all the data values in hospitals collection under the location data label.
      return locations
    } catch (e) {
      console.error(`Unable to get locations, ${e}`)
      return locations
    }
  }


  static async getServices(){
    let s=[]
    try{

     s=await hospitals.distinct("service");
    return s
      } catch(e){
          console.log(`Unable to get the services`)
          return s
      }
   }

   // TO DO:
   // 2. Add the wait time
   static async hospitalsSearch({
        //these are the parameters for our getHospital function
      filters = null, //this is for searching particular keywords in hospital database
      page = 0, //this is for indicating the page number in our searches. set to 0 default
      hospitalsPerPage = 20, //this is the limit of how many hospitals to display per paage
    } = {}) { //async function body(promise) starts here
  
    let query //query is a dictionary object. we use this query to filter our searches.
    let cursor

    if (filters)
    {
      if ("location" in filters)
      {
        query = { "address.postal_code": { $regex: ".*"+filters["location"].toUpperCase()+".*" } }
      }
    }
    
    try
    {
      cursor = await hospitals
        .find(query) //we then find and return all database documents/data that have our selector(query is a unique selector we defined earlier)
    } catch (e)
    {
      console.error(`Unable to issue find command, ${e}`)
      return { hospitalsList: [], totalNumHospitals: 0 }
    }
    
    //cursor holds all our unique database documents we filtered with query.
    //but displayCursor further filters the cursor, by the parameters of restaruatantsperpage and page number
    const displayCursor = cursor.limit(hospitalsPerPage).skip(hospitalsPerPage * page) //skip enables us to skip to the document that corresponds to our selected page and our default resultsperpage variable

    try {
        //converts all our displayed data to an array
      const hospitalsListUnfiltered = await displayCursor.toArray()
    //   counts the documents in cursor
      const totalNumHospitalsUnfiltered = await hospitals.countDocuments(query)
      var hospitalsListVar = []

      if (filters)
      {
          if("services" in filters)
          {
              // Filter for hospitals that provide all the services required
              var foundServices = []
              var foundServicesNames = []
              var foundServicesLength = 0
              var maxFoundServicesLength = 0
              var notFoundServices
              var minLiveEstWaitTime // Minimum time for each hospital (used as the wait time)

              // For each hospital
              for (var i = 0; i < totalNumHospitalsUnfiltered; i++) {
                  var hospital = hospitalsListUnfiltered[i];
                  foundServices = []
                  foundServicesNames = []
                  notFoundServices = filters["services"]
                  minLiveEstWaitTime = 10000 // Start at some infinity value
                  
                  // For each service
                  for (var j = 0; j < hospital.services.length; j++) {
                      var service = hospital.services[j];

                      // Record that this service has been found, add it to the foundServices list for later use
                      if(notFoundServices.includes(service.name))
                      {
                        foundServices.push(service)
                        foundServicesNames.push(service.name)
                        // Calculate the wait time for this service at this hospital
                        let { liveEstWaitTime } = await ServicesDAO.liveEstimatedWaitTime({
                          service,
                          visit: null
                        })
                        if(liveEstWaitTime < minLiveEstWaitTime)
                        {
                          minLiveEstWaitTime = liveEstWaitTime
                        }
                        notFoundServices = notFoundServices.filter(function(value, index, arr){ 
                            return value != service.name;
                        });
                      }
                  }

                  // Keep track of which hospital has the maximum number of requested services so far
                  foundServicesLength = foundServices.length
                  if(foundServicesLength > maxFoundServicesLength)
                  {
                    maxFoundServicesLength = foundServicesLength
                  }

                  // Don't bother returning hospitals that have none of the requested services
                  if(foundServicesLength != 0)
                  {
                    hospitalsListVar.push({
                      "id": hospital._id,
                      "name": hospital.name,
                      "address": hospital.address,
                      "foundServices": foundServicesNames,
                      "numFoundServices": foundServices.length,
                      "estWaitTime": minLiveEstWaitTime
                    })
                  }
              }

              // Filter based on the number of found services. If there is/are hospitals with ALL services
              // requested, filter for those. Otherwise, filter for the ones with the MAXIMUM number of the
              // services requested
              hospitalsListVar = hospitalsListVar.filter(function(x){ 
                  return x.numFoundServices == maxFoundServicesLength;
              });

              // Return the list filtered for services
              const hospitalsList = hospitalsListVar
              const totalNumHospitals = hospitalsListVar.length

              return { hospitalsList, totalNumHospitals }
          
            }
            
            // Return the list not filtered for services - put in the required format
            var foundServicesNames = []
            let calculatedLiveEstWaitTime

            for (var i = 0; i < totalNumHospitalsUnfiltered; i++) {
              var hospital = hospitalsListUnfiltered[i];
              foundServicesNames = []
              for (var j = 0; j < hospital.services.length; j++) {
                  var service = hospital.services[j];
                  foundServicesNames.push(service.name)
                  // Calculate the wait time for the default service (emergency) since no specific one is requested
                  if(service.name === "emergency")
                  {
                    let { liveEstWaitTime } = await ServicesDAO.liveEstimatedWaitTime({
                      service,
                      visit: null
                    })
                    calculatedLiveEstWaitTime = liveEstWaitTime
                  }
              }
              hospitalsListVar.push({
                "name": hospital.name,
                "address": hospital.address,
                "foundServices": foundServicesNames,
                "numFoundServices": foundServicesNames.length,
                "estWaitTime": calculatedLiveEstWaitTime
              })
            }

            const hospitalsList = hospitalsListVar
            const totalNumHospitals = totalNumHospitalsUnfiltered

            return { hospitalsList, totalNumHospitals }
      
      }

      // If no filters, return the unfiltered hospitals list - put in the required format
      var foundServicesNames = []
      let calculatedLiveEstWaitTime

      for (var i = 0; i < totalNumHospitalsUnfiltered; i++) {
        var hospital = hospitalsListUnfiltered[i];
        foundServicesNames = []
        for (var j = 0; j < hospital.services.length; j++) {
            var service = hospital.services[j];
            foundServicesNames.push(service.name)
            // Calculate the wait time for the default service (emergency) since no specific one is requested
            if(service.name === "emergency")
            {
              let { liveEstWaitTime } = await ServicesDAO.liveEstimatedWaitTime({
                service,
                visit: null
              })
              calculatedLiveEstWaitTime = liveEstWaitTime
            }
        }
        hospitalsListVar.push({
          "name": hospital.name,
          "address": hospital.address,
          "foundServices": foundServicesNames,
          "numFoundServices": foundServicesNames.length,
          "estWaitTime": calculatedLiveEstWaitTime
        })
      }

      const hospitalsList = hospitalsListVar
      const totalNumHospitals = totalNumHospitalsUnfiltered

      return { hospitalsList, totalNumHospitals }

    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { hospitalsList: [], totalNumHospitals: 0 }
    }

}//static async hospital search

}//class hospitalDAO