import pkg from 'google-auth-library';
import dotenv from "dotenv"

dotenv.config();
const { OAuth2Client } = pkg;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);


const auth = async(req, res, next) => {

    //console.log(req.body)
    req.userID = req.body.userID
    //console.log(req.userID)
    next();
    /*
    try{

        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        
        const { name, email, picture } = ticket.getPayload()
        req.userID = ticket.getUserId()

        next();
    } catch( error ) {
        console.log(error);
    }
    */

}

export default auth;