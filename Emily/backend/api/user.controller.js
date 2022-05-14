import UserDAO from "../dao/userDAO.js"
import Joi from "joi"

import pkg from 'google-auth-library';
import dotenv from "dotenv"

dotenv.config();
const { OAuth2Client } = pkg;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// the controller file connects the route and DAO. it sends the DAO to the route, thru res.json
export default class UserController {
    
    // Handle API request to create a new user
    static async apiPostNewUser(req, res, next)
    {
        // Future: Add better validation such as email validation
        const schema = {
            username: Joi.string().min(5).required(),
            email: Joi.string().min(5).required(),
            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            age: Joi.number(),
            sex: Joi.string().max(1),
            weight: Joi.number(),
            height: Joi.number(),
            postalCode: Joi.string().min(3).max(6),
            healthCardNum: Joi.string().min(4),
            medicalAllergies: Joi.array(),
            familyPhysician: Joi.string().min(2),
            emergencyContact: Joi.string().min(2)
        }

        const inputValResult = Joi.validate(req.body, schema)
        
        if(inputValResult.error)
        {
            let response = {
                success: false,
                error: inputValResult.error.details[0].message
            }
            res.json(response)
            return
        }

        let { usernameValidationTest } = await UserDAO.checkUserName({ username: req.body.username })
        let { emailValidationTest } = await UserDAO.checkEmail({ email: req.body.email })

        if(usernameValidationTest == false)
        {
            let response = {
                success: false,
                error: "Username already taken"
            }
            res.json(response)
            return
        }

        if(emailValidationTest == false)
        {
            let response = {
                success: false,
                error: "Email already taken"
            }
            res.json(response)
            return
        }
        
        // Create the new user if the validation tests passed
        await UserDAO.createNewUser({ userData: req.body })
        let response = {
            success: true
        }

        // Send json response to whomever requests it
        res.json(response)
    }

    // Handle API request to update an existing user's info
    static async apiUpdateUserInfo(req, res, next)
    {
        // Besides the username and email, everything else can be updated
        const schema = {
            username: Joi.string().min(5).required(),
            firstName: Joi.string().min(2),
            lastName: Joi.string().min(2),
            age: Joi.number(),
            sex: Joi.string().max(1),
            weight: Joi.number(),
            height: Joi.number(),
            postalCode: Joi.string().min(3).max(6),
            healthCardNum: Joi.string().min(4),
            medicalAllergies: Joi.array(),
            familyPhysician: Joi.string().min(2),
            emergencyContact: Joi.string().min(2)
        }

        const inputValResult = Joi.validate(req.body, schema)
        
        if(inputValResult.error)
        {
            let response = {
                success: false,
                error: inputValResult.error.details[0].message
            }
            res.json(response)
            return
        }

        let { usernameValidationTest } = await UserDAO.checkUserName({ username: req.body.username })

        if(usernameValidationTest == true)
        {
            let response = {
                success: false,
                error: "Username not found"
            }
            res.json(response)
            return
        }
        
        // Create the new user if the validation tests passed
        await UserDAO.updateUserData({ username: req.body.username, newData: req.body })
        let response = {
            success: true
        }

        // Send json response to whomever requests it
        res.json(response)
    }


    // Handle API request to update an existing user's info
    static async apiUpdateUserInfoByID(req, res, next)
    {
        if(!req.userID)
        {
            console.log("Unauthenticated")
            res.json({
                success: false,
                error: "Unauthenticated"
            })
        }

        // Besides the username and email, everything else can be updated
        const schema = {
            userID: Joi.string().min(5),
            name: Joi.string().min(2),
            phone: Joi.string().min(2),
            age: Joi.number(),
            sex: Joi.string().max(1),
            height: Joi.number(),
            weight: Joi.number(),
            address: Joi.string().min(2),
            postalCode: Joi.string().min(3).max(6),
            healthCardNumber: Joi.string().min(4),
            medicalAllergies: Joi.string(),
            familyPhysician: Joi.string().min(2),
            emergencyContact: Joi.string().min(2)
        }

        const inputValResult = Joi.validate(req.body, schema)
        
        if(inputValResult.error)
        {
            let response = {
                success: false,
                error: inputValResult.error.details[0].message
            }
            res.json(response)
            return
        }

        let { userIDValidationTest } = await UserDAO.checkUserID({ userID: req.userID })

        // If the user doesn't exist in the database
        if(userIDValidationTest == false)
        {
            let response = {
                success: false,
                error: "UserID not found"
            }
            res.json(response)
            return
        }
        
        // Create the new user if the validation tests passed
        await UserDAO.updateUserDataByID({ userID: req.userID, newData: req.body })
        let response = {
            success: true
        }

        // Send json response to whomever requests it
        res.json(response)
    }


    // Handle API request to get data for existing user
    static async apiGetUserInfo(req, res, next)
    {
        // Besides the username and email, everything else can be updated
        const schema = {
            username: Joi.string().min(5).required(),
            fields: Joi.object().required()
        }

        const inputValResult = Joi.validate(req.body, schema)
        
        if(inputValResult.error)
        {
            let response = {
                success: false,
                error: inputValResult.error.details[0].message
            }
            res.json(response)
            return
        }

        let { usernameValidationTest } = await UserDAO.checkUserName({ username: req.body.username })

        if(usernameValidationTest == true)
        {
            let response = {
                success: false,
                error: "Username not found"
            }
            res.json(response)
            return
        }
        
        // Create the new user if the validation tests passed
        let { success, data } = await UserDAO.getUserData({ username: req.body.username, fields: req.body.fields })
        let response = {
            success: success,
            data: data
        }

        // Send json response to whomever requests it
        res.json(response)
    }

    // Handle API request to get data for existing user (by user ID)
    static async apiGetUserInfoByID(req, res, next)
    {

        if(!req.userID)
        {
            console.log("Unauthenticated")
            res.json({
                success: false,
                error: "Unauthenticated"
            })
        }
        let { userIDValidationTest } = await UserDAO.checkUserID({ userID: req.userID })

        // If the user doesn't exist in the database
        if(userIDValidationTest == false)
        {
            let response = {
                success: false,
                error: "UserID not found"
            }
            res.json(response)
            return
        }
        
        // Get the user's data if the validation tests passed
        let { success, data } = await UserDAO.getUserDataByID({ userID: req.userID })
        let response = {
            success: success,
            data: data
        }

        // Send json response to whomever requests it
        res.json(response)
    }

    // Handle API request to create a new user
    static async apiLoginUser(req, res, next)
    {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        
        const { name, email, picture } = ticket.getPayload();
        const userID = ticket.getUserId()

        let { userIDValidationTest } = await UserDAO.checkUserID({ userID: userID })

        // If the user doesn't exist in the database
        if(userIDValidationTest == false)
        {
            // Create new user
            let newUserData = {
                userID: userID,
                name: name,
                email: email,
                phone:'',
                age: 0,
                sex: '',
                height: 0,
                weight: 0,
                bmi: 0,
                address:'',
                postalCode: '',
                healthCardNumber: '',
                medicalAllergies: '',
                familyPhysician: '',
                emergencyContact: '',
                avatar: 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_3_190bd9ade1.png'
            }
            await UserDAO.createNewUser({ userData: newUserData })
        }

        res.status(201);
        res.json({ name, email, picture, userID });
    }
  
}