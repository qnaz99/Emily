import "./style.css"
import "./../index.css"
import pic from './../images/hospital.jpeg'
import Rating from '@mui/material/Rating';
import React, { useState,useEffect} from 'react';

import DataService from "../services"
import { useParams } from 'react-router-dom'

function ReviewSummary() {
    
const [hospitals,setHospitals]=useState([{}])
    const [address,setAddress]=useState([{}])
    
    useEffect(() => {
    DataService.getAllHospitals().then(response=>{
    
    // console.log(response.data.hospitals)
    setHospitals(response.data.hospitals)
    
    
    
    
    })
    }, )
    
    // row.map((r)=>{
    
    // setAddress(r.address)
    
    
    // })
    
    // console.log(address)
        // const rows = [
        //     {
        //         name:'St.Micheal\'s Hospital',
        //         address:'123 Street Name, City, Postal',
        //         waitTime:'1h',
        //         services:134,
        //         id:'1'
        //     },
        //     {
        //         name:'Toronto Western Hospital',
        //         address:'123 Street Name, City, Postal',
        //         waitTime:'1h',
        //         services:453,
        //         id:'2'
        //     },
        //     {
        //         name:'Toronto General Hospital',
        //         address:'123 Street Name, City, Postal',
        //         waitTime:'1h',
        //         services:233,
        //         id:'3'
        //     }
        // ]
    
    return (
        <div>
            <div className='rounded shadow info-card p-3'>
                <div className='font-bold text-lg'>Hospital Near You</div>
                <div className='flex overflow-auto'>
                    {hospitals.map((hos) => (
                        <div key={hos.id} className='mr-3'>
                            <img className='review-pic' src={pic} />
                            <div className='font-semibold text-md mt-3'>{hos.name}</div>
                            <div className='text'>{hos.address?.street}</div>
                            <Rating size="small" value={hos.rating} readOnly />
                        </div>
                    ))}
                </div>
                <div className='font-bold text-lg mt-8'>Recently Searched Hospital</div>
                <div className='flex overflow-auto'>
                    {hospitals.map((hos) => (
                        <div key={hos.id} className='mr-3'>
                            <img className='review-pic' src={pic} />
                            <div className='font-semibold text-md mt-3'>{hos.name}</div>
                            <div className='text'>{hos.address?.street}</div>
                            <Rating size="small" value={hos.rating} readOnly />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        
    )
}

export default ReviewSummary
 