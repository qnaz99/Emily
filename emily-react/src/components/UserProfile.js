import React from 'react'
import Profile from './Profile/Profile'
import Field from './Field/Field'
import "./UserProfile.css"
import { useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import { useParams, useSearchParams } from 'react-router-dom'

import DataService from "../services"

function UserProfile(props){
    const [searchParams] = useSearchParams();
    let userID = "";
    for (const entry of searchParams.entries()) {
        //console.log(entry);
        userID = entry[0];
        break;
    }

    //console.log("userID from UserProfile.js");
    //console.log(userID);

    const [inputs, setInputs] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        inputs.userID = userID;
        let newUserData = {
            userID: userID
        }
        if(inputs.name && inputs.name != "")
        {
            newUserData.name = inputs.name
        }
        if(inputs.healthcard && inputs.healthcard != "")
        {
            newUserData.healthCardNumber = inputs.healthcard
        }
        if(inputs.allergies && inputs.allergies != "")
        {
            newUserData.medicalAllergies = inputs.allergies
        }
        console.log(newUserData);
        DataService.updateUserData(newUserData);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const [user,setUser]=useState({
        name:'',
        email:'',
        phone:'',
        address:'',
        sex:'',
        age: null,
        height: null,
        weight: null,
        healthCardNumber:'',
        bmi:null})
    
    const userdata ={
        userID: userID        
    }
    
    useEffect(() => {
        DataService.getUserData(userdata).then((response)=>{
    setUser(response.data.data)
        })
    },[userID, user] )

    return(
        <div>
            <div id="sidebarr">
                <Sidebar userID={userID} />
            </div>
            <div id='rectangle'></div>
            <Profile profileName={user.name} pic={user.avatar}/>  
            <form onSubmit={handleSubmit}>
                <label id='nameField'>Name:<br></br>
                <input
                    type="text" 
                    name="name" 
                    value={inputs.name || ""} 
                    onChange={handleChange}
                    placeholder="Full Name"
                />
                </label>
                <label id="contact">Emergency Contact:<br></br>
                    <input type="text" name="contact" placeholder="Phone Number" value={inputs.contact || ""} onChange={handleChange}/>
                </label>

                <label id="healthCard">Health Card Number:<br></br>
                    <input type="text" name="healthcard" placeholder="#### - ### - ### - XX" value={inputs.healthcard || ""} onChange={handleChange}/>
                </label>

                <label id="allergies">Medical Allergies:<br></br>
                    <input type="text" name="allergies" placeholder="List seperated by commas"  size="23" value={inputs.allergies || ""} onChange={handleChange}/>
                </label>

                <label id="medication">Current Medication:<br></br>
                    <input type="text" name="meds" placeholder="List seperated by commas"  size="23" value={inputs.meds || ""} onChange={handleChange}/>
                </label>



                    <input id='submit' type="submit" />
            </form>
        </div>
    )
}


export default UserProfile