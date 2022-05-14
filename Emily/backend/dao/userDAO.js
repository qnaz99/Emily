import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

//Data Object Model
let user // local variable for whole file so global variable actually

//an async fdgfunction is a specfial type of function that only returns a promise.
//a promise is a peice of code in the function body {} that either is pending,succefully fufilled/executed, or rejected(faoliure or error).
//await can only be used inside an async
export default class UserDAO {
    static async injectDB(conn) { //create injectDB function to straight away connect to the hospital collection in our db
        //if hospital db with data exists then return .
        if (user) {
            return
        }
        // then set hospitals to the mongodb env file, sample_hospitals
        try {
        //when await is placed before a method like conn.db() or anyother method,
        //then the entire line of code , in this case hospitals=await conn.db()... , get executed
        //only if the code after await is succesful.(code after await is the method, conn.db()..)
            user = await conn.db(process.env.collection_NS).collection("User")
        } catch (e) {
            console.error(
            `Unable to establish a collection handle in userDAO: ${e}`,
            )
        }
    }

   static async createNewUser({
      userData
    } = {}) { //async function body(promise) starts here

        try
        {
            const result = await user.insertOne(userData)

            return { success: true }
        } catch (e)
        {
            console.error(`Unable to insert to database, ${e}`)
            return { success: false }
        }

    } //static async createNewUser

    // Check if a username is taken (true: good to use, false: taken)
    static async checkUserID({
        userID
    } = {}) { //async function body(promise) starts here

        try
        {
            let query = { "userID": userID }
            const result = await user.findOne(query)

            // Check if the userID was found, return false if no
            if(result == null)
            {
                return { userIDValidationTest: false }
            }

            return { userIDValidationTest: true }
            
        } catch (e)
        {
            console.error(`Unable to check userID in database, ${e}`)
            return { userIDValidationTest: false }
        }

    } //static async checkUserID
      
    // Check if a username is taken (true: good to use, false: taken)
    static async checkUserName({
        username
      } = {}) { //async function body(promise) starts here
  
          try
          {
              let query = { "username": username }
              const result = await user.findOne(query)

              // Check if the username was found, return false if yes
              if(result != null)
              {
                  return { usernameValidationTest: false }
              }

              return { usernameValidationTest: true }
              
          } catch (e)
          {
              console.error(`Unable to check username in database, ${e}`)
              return { usernameValidationTest: false }
          }
  
      } //static async checkUserName

    // Check if an email is taken (true: good to use, false: taken)
    static async checkEmail({
        email
    } = {}) { //async function body(promise) starts here

        try
        {
            let query = { "email": email }
            const result = await user.findOne(query)

            // Check if the email was found, return false if yes
            if(result != null)
            {
                return { emailValidationTest: false }
            }

            return { emailValidationTest: true }
            
        } catch (e)
        {
            console.error(`Unable to check email in database, ${e}`)
            return { emailValidationTest: false }
        }

    } //static async checkEmail

    static async updateUserData({
        username,
        newData
      } = {}) { //async function body(promise) starts here
  
          try
          {
              var query = { username: username }
              var update = { $set: newData }
              const result = await user.updateOne(query, update)
  
              return { success: true }
          } catch (e)
          {
              console.error(`Unable to update data in database, ${e}`)
              return { success: false }
          }
  
      } //static async createNewUser

    // Get data for a specific user
    static async getUserData({
        username, fields
    } = {}) { //async function body(promise) starts here

        try
        {
            let query = { "username": username }
            let fieldsComplete = fields
            fieldsComplete._id = 0

            const result = await user.findOne(query, { projection : fieldsComplete })

            // Check if any data was found
            if(result == null)
            {
                return { success: false, data: result }
            }

            return { success: true, data: result }
            
        } catch (e)
        {
            console.error(`Unable to get data from database, ${e}`)
            return { success: false, data: null }
        }

    } //static async checkEmail


    // Get data for a specific user
    static async getUserDataByID({
        userID
    } = {}) { //async function body(promise) starts here

        try
        {
            let query = { "userID": userID }

            //console.log(query)

            const result = await user.findOne(query)

            // Check if any data was found
            if(result == null)
            {
                return { success: false, data: result }
            }

            return { success: true, data: result }
            
        } catch (e)
        {
            console.error(`Unable to get data from database, ${e}`)
            return { success: false, data: null }
        }

    } //static async getUserDataByID


    static async updateUserDataByID({
        userID,
        newData
      } = {}) { //async function body(promise) starts here
  
          try
          {
              var query = { userID: userID }
              var update = { $set: newData }
              const result = await user.updateOne(query, update)
  
              return { success: true }
          } catch (e)
          {
              console.error(`Unable to update data in database, ${e}`)
              return { success: false }
          }
  
      } //static async updateUserDataByID

} //class userDAO