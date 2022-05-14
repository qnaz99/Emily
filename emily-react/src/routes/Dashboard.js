import React, { useState,useEffect} from 'react';
import background from './../images/Background.png'
import TopBar from './../components/TopBar.js'
import ProfileCard from './../components/ProfileCard.js'
import BookVaccine from './../components/BookVaccine.js'
import HospitalTable from './../components/HospitalTable.js'
import "./style.css"
import "./../index.css"
import ReviewSummary from '../components/ReviewSummary'
import PopularTimes from '../components/PopularTimes'
import Sidebar from "../components/Sidebar"

import DataService from "../services"
import { useParams, useSearchParams } from 'react-router-dom'

function Dashboard(props) {
    const [searchParams] = useSearchParams();
    let userID = "";
    for (const entry of searchParams.entries()) {
        //console.log(entry);
        userID = entry[0];
        break;
    }
    console.log("userID from dashboard.js");
    console.log(userID);
    //const userID = searchParams.entries(0);
const [user,setUser]=useState({
    name:'',
    email:'',
    phone:'',
    address:'',
    sex:'',
    age: null,
    height: null,
    weight: null,
    healthCardNumber:''})

const userdata ={
    userID: userID        
}

useEffect(() => {
    DataService.getUserData(userdata).then((response)=>{
setUser(response.data.data)
    })
},[userID] )

//console.log(username )
    return (
        <div>
        <Sidebar userID={userID} />
            <div className='background-holder'>
                <div className='bg'>
                    <img src={background} className='background-img' alt="Test" />
                </div>   
            </div>
            <div className='page-style'>
                <TopBar pageName={"Dashboard"}/>

                <div className='white-text mt-10 text-4xl font-bold'>Welcome back, {user.name}</div>                <div className='flex mt-10'>
                    <div className='w-1/3'>
                        <div className='mt-8'>
                            <ProfileCard user={user} />
                        </div>
                        <BookVaccine />
                    </div>
                    <div className='w-1/3 mx-5'>
                        <ReviewSummary />
                    </div>
                    <div className='w-1/3'>
                        <PopularTimes />
                    </div>
                </div>
                <div className='mt-8'>
                    <HospitalTable />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
 