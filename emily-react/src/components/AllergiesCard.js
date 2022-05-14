import React from 'react'
import "./style.css"
import "./../index.css"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Allergies(props) {
    const allergies = [
        'grass',
        'nuts',
        'milk',
        'dust',
        'ibuprofen',
        'mold'
    ]

    return (
        <div>
            <div className='bg-white rounded shadow-lg p-3 allergies-card'>
                <div className='justify-end flex'>Updated on Apr/01/2022</div>
                {allergies.map((allergy) => {
                    return (
                        <div key={allergy} className='p-2 flex items-center'>
                            <div className={props.user?.medicalAllergies?.includes(allergy) ? 'icon-green' : 'hidden'}>
                                <CheckCircleIcon />
                            </div>
                            <div className={!props.user?.medicalAllergies?.includes(allergy) ? 'icon-red' : 'hidden'}>
                                <CancelIcon />
                            </div>  
                            <div className='ml-3'>
                                <strong className='text-lg'>{allergy}</strong>
                                <div className='text-inherit'></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Allergies