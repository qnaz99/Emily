import express from "express"

// we need a controller file for the router to use to route to the DAO
import HospitalsController from "./hospitals.controller.js"
import UserController from "./user.controller.js"
//  import ReviewsController from "./reviews.controller.js"

import auth from '../middleware/auth.js'

const router = express.Router()
//right here something funny happens: when we put the locations api call at the very last, it doesnt work at all. If we however put it at the top or the middle
//it will start to work. the reason appears to be that there is an error of the API url id needing to have a unique id code( like EOIUC913JAD) 
// so when we call ap1/v1/locations , there is no unique ID thus it gives an error. 

router.route("/").get(HospitalsController.apiGetHospitals)
router.route("/locations").get(HospitalsController.apiGetHospitalLocations)//we want to get all the locations so in our front end we can display them in a drop down menue for the user to select
router.route("/services").get(HospitalsController.apiGetHospitalServices)//we want to get all the locations so in our front end we can display them in a drop down menue for the user to select
router.route("/hospitalsearch").post(HospitalsController.apiHospitalSearch)//we want to get each single hospital
router.route("/hospitalsearch2").get(HospitalsController.apiHospitalSearch)//we want to get each single hospital

router.route("/user/create").post(UserController.apiPostNewUser)
router.route("/user/updateinfo").put(UserController.apiUpdateUserInfo)
router.route("/user").post(UserController.apiGetUserInfo)

router.route('/google-login').post(UserController.apiLoginUser);
router.route("/user/data").post(auth, UserController.apiGetUserInfoByID) // will be authenticated, requires req.userID from middleware
//router.route("/user/data").get(UserController.apiGetUserInfoByID) // for testing only
router.route("/user/update").put(auth, UserController.apiUpdateUserInfoByID)

router.route("/:id").get(HospitalsController.apiGetHospitalById)//we want to get each single hospital

//we need to route to POST UPDATE AND DELETE api.
//these apis will be performed on the reviews schema

//notice that only GET needs direct URLs from API to display this is because the PUT ,UPDATE, DELETE happen without displaying anything
//YOU NEED THIS : you need t
//there is no GET review


// router
//   .route("/review")
//   .post(ReviewsController.apiPostReview)
//   .put(ReviewsController.apiUpdateReview)
//   // note need to add question mark for backend api call. like api.v1/review?{id}
//   .delete(ReviewsController.apiDeleteReview)

export default router