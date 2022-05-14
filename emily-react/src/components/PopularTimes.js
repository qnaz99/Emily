import React from 'react'
import "./style.css"
import "./../index.css"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function PopularTimes() {
    const data = [
        {
            name:'8 AM',
            visitors:20
        },
        {
            name:'9 AM',
            visitors:40
        },
        {
            name:'10 AM',
            visitors:70
        },
        {
            name:'11 AM',
            visitors:10
        },
        {
            name:'12 PM',
            visitors:30
        },
        {
            name:'1 PM',
            visitors:50
        },
        {
            name:'2 PM',
            visitors:50
        },
        {
            name:'3 PM',
            visitors:60
        }

    ]
    return (
        <div>
            <div className='rounded shadow info-card p-3'>
                <div className='text'>POPULAR TIMES</div>
                <div className='text-lg font-bold'>Toronto Western Hospital</div>
                <div className='mt-8'>
                    <LineChart width={600} height={500} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            </div>
        </div>

        
    )
}

export default PopularTimes
 