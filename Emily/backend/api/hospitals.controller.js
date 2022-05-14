  
import HospitalsDAO from "../dao/hospitalsDAO.js"

// the controller file connects the route and DAO. it sends the DAO to the route, thru res.json
export default class HospitalsController {
  static async apiGetHospitals(req, res, next) {
      //query here referes to query string of the url. hospitalsPerPage is going to equl to the integer representation of the HospitalPerPage of the query string in the url. the default is set to 20. 10 represents base decimal 10. 10 represents
    //   resPerPage has to exist 
    const hospitalsPerPage = req.query.hospitalsPerPage ? parseInt(req.query.hospitalsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0


    //we will have location,service, and name as the three queries for hospitals
    let filters = {}
    if (req.query.location) {
      filters.location = req.query.location
    } else if (req.query.service) {
      filters.service = req.query.service
    } else if (req.query.name) {
      filters.name = req.query.name
    }

    //performs the get restarurant function given the props, and returns the HospitalList in HospitalLists and 
    // totalNumber of restuarants in totalNumHospitals
    const { hospitalsList, totalNumHospitals } = await HospitalsDAO.getHospitals({
      filters,
      page,
      hospitalsPerPage,
    })

    //this is the json data packet(dicitoanry) to be sent
    let response = {
      hospitals: hospitalsList, //this will be a dictionary in and of itself.
      page: page,
      filters: filters,
      entries_per_page: hospitalsPerPage,
      total_results: totalNumHospitals,
    }
    // sends json response to whomever requests it
    res.json(response)
  }
  static async apiGetHospitalById(req, res, next) {
    try {
      //1.We need to access identifier code from the url. id stores the unique key in the url
      let id = req.params.id || {} //Note, params is anything after / and query is anything after ? in the url.
      //2.the controller creates the object packed with the return value of getHospitalbyid method
      let hospital = await HospitalsDAO.getHospitalByID(id)
      if (!hospital) {
        res.status(404).json({ error: "Not found" })
        return
      }
      //3.Sends the data packet through json.
      res.json(hospital)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }


//this a) stores method return in cusine object
// b) sneds json data packet of the object
   static async apiGetHospitalLocations(req, res, next) {
     try {
       let locations = await HospitalsDAO.getLocations()
       res.json(locations)
     } catch (e) {
       console.log(`api, ${e}`)
       res.status(500).json({ error: e })
     }
   }

   static async apiGetHospitalServices(req,res,next){

    let services=[]
    try{
        services=await HospitalsDAO.getServices()
        res.json(services) //need to return the JSON file object
    }catch(e){
        console.log(`api,${e}`)
        res.status(500).json({error:e})
    }

   }


   static async apiHospitalSearch(req, res, next) {
    //query here referes to query string of the url. hospitalsPerPage is going to equl to the integer representation of the HospitalPerPage of the query string in the url. the default is set to 20. 10 represents base decimal 10. 10 represents
  //   resPerPage has to exist 
  const hospitalsPerPage = req.query.hospitalsPerPage ? parseInt(req.query.hospitalsPerPage, 10) : 20
  const page = req.query.page ? parseInt(req.query.page, 10) : 0


  // Filters for list of hospitals
  let filters = {}

  if (req.query.location)
  {
    filters.location = req.query.location
  }
  if (req.body.services)
  {
    // Only filter for services if they are given and the list is not empty
    if(req.body.services.length != 0)
    {
      filters.services = req.body.services
    }
  }

  console.log("Filters:")
  console.log(filters);
  console.log("")

  const { hospitalsList, totalNumHospitals } = await HospitalsDAO.hospitalsSearch({
    filters,
    page,
    hospitalsPerPage,
  })

  // this is the json data packet(dictionary) to be sent
  let response = {
    hospitals: hospitalsList, //this will be a dictionary in and of itself.
    page: page,
    filters: filters,
    entries_per_page: hospitalsPerPage,
    total_results: totalNumHospitals,
  }

  // sends json response to whomever requests it
  res.json(response)
}
  
}