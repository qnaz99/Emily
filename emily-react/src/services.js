import http from "./http-common";
// All these HTTP /API calls are to the SERVER. They have nothing to do with the frontend or the superficial layer of the website. These methods are used by the 
// frontend but this services/restaurant.js file itself connects the backend to the frontend by calling the requests. Note that each 
//url in get/post/put/delete requests are urls of the server:5000 base url ("http://localhost:5000/api/v1")


//REQBIN/POSTMAN
class DataService {





//user


getUserData(data) {
    return http.post("/user/data", data);
  }

getAllHospitals(){

return http.get("/hospitalsearch2")
}


updateUserData(data){
  return http.put("/user/update", data)
}

//   getAll(page = 0) {
//     return http.get(`/?page=${page}`); //think of this http.get() as something similar to ReqBin or POSTMAN. When we enter the URL of 
//     //in Reqbin, we have to choose get,post,update,or delete and there is also a context body where we enter any information. In this case,
//     // the DATA ( AS witnessed below in createReview) would be the content in this body area. Moreover, in this case there are no 
//     //data field, thus we are simply choosing the get option and returning that data.
//   }

//   get(id) {
//     return http.get(`/${id}`);
//   }

//   find(query, by = "name", page = 0) {
//     return http.get(`/?${by}=${query}&page=${page}`);
//   } 

//   createReview(data) {
//     return http.post("/review", data);
//   }

//   updateReview(data) {
//     return http.put("/review", data);
//   }
// // take of the id= in id={id}
//   deleteReview(id, userId) {
//     return http.delete(`/review?id=${id}`, {data:{user_id: userId}});
//   }

//   getCuisines(id) {
//     return http.get(`/cuisines`);
//   }

}

export default new DataService();