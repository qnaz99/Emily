import React from 'react'
import "./style.css"
import "./../index.css"
import dp from './../images/dp.png'
import Button from '@mui/material/Button';


function ProfileCard(props) {



    return (
        <div>
            <div className='rounded shadow info-card p-3'>
                <div className='text'>PROFILE</div>
                <div className='mt-5 flex'>
                    <img className='user-avatar' src={props.user.avatar || dp} alt="" />
                    <div className='ml-5'>
                        <div className='text-lg'>{props.user.name}</div>
                        <div className='text'>{props.user.email}</div>
                        <div className='text'>{props.user.phone}</div>
                    </div>
                </div>
                <div className='mt-2 flex'>
                    <div>
                        <div className='text'>Address: {props.user.address}</div>
                        <div className='text'>Sex: {props.user.sex}</div>
                        <div className='text'>Health Card Number: {props.user?.healthCardNumber}</div>
                    </div>
                    <div className='ml-5'>
                        <div className='text'>Age: {props.user.age}</div>
                        <div className='text'>Height: {props.user.height}</div>
                        <div className='text'>Weight: {props.user.weight}</div>
                    </div>
                </div>
                <div className='flex justify-end mt-3'>
                    <Button variant="contained" size="small">GO TO MY PROFILE</Button>
                </div>
            </div>
        </div>

        
    )
}

export default ProfileCard
 