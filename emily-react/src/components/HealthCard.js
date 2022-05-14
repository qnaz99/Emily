import React from 'react'
import "./style.css"
import "./../index.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HealthCard(props) {
    return (
        <div>
            <div className='healthcard'>
                <div className='healthcard-top p-3 text-lg white-text'>Ontario</div>
                <div className='p-8 flex'>
                    <div className='account-avatar'>
                        <AccountCircleIcon />
                    </div>
                    <div className='flex-1 ml-3'>
                        {/*<div className='text-4xl font-bold'>Health Card</div>*/}
                        <div className='text-3xl font-bold'>{props.user?.name}</div>
                        <div className='mt-3 text-xl'>{props.user?.healthCardNumber}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthCard