import "./style.css"
import "./../index.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import dp from './../images/dp.png'
import Button from '@mui/material/Button';
import React, { useState,useEffect} from 'react';

import DataService from "../services"
import { useParams } from 'react-router-dom'

function HospitalTable() {

const [row,setRow]=useState([{

//     "name": "The Hospital for Sick Children",
//     "address": {
//         "street": "555 University Ave",
//         "postal_code": "M5G 1X8",
//         "city": "Toronto",
//         "province": "ON",
//         "country": "Canada"
//     },
//     "foundServices": ["x-ray", "mri", "emergency", "bloodwork", "chemotherapy"],
//     "numFoundServices": 5,
//     "estWaitTime": 28
// }, {
//     "name": "Women’s College Hospital",
//     "address": {
//         "street": "76 Grenville St",
//         "postal_code": "M5S 1B2",
//         "city": "Toronto",
//         "province": "ON",
//         "country": "Canada"
//     },
//     "foundServices": ["cardiology", "ct-scan", "emergency", "bloodwork", "chemotherapy"],
//     "numFoundServices": 5,
//     "estWaitTime": 21
}
])
const [address,setAddress]=useState({

    city: "",
    country: "",
    postal_code: "",
    province: "",
    street: ""

})

useEffect(() => {
DataService.getAllHospitals().then(response=>{

// console.log(response.data.hospitals)
setRow(response.data.hospitals)




})
}, )

//YOU MUST ADD the ? sign for these objects. if you dont an ERROR in the frontend will occur because when you refresh,
//react has to check if address array exits or not. the questions mark denotes that if address is true(exists) than execut .city
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
                <div className='text-lg font-bold'>Hospitals</div>
                <div className='flex justify-end mb-5'>
                    <Button variant="contained" size="small">SEE ALL</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Emergency Room Wait Time</TableCell>
                                <TableCell>Services</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {row.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell>
                                        {r.name}
                                    </TableCell>
                                    <TableCell>
                                        {`${r.estWaitTime} min`}
                                    </TableCell>
                                    <TableCell>
                                        {`${r?.foundServices}`}
                                    </TableCell>
                                    <TableCell>
                                    { 
                                        

       `${r?.address?.street}  ${r?.address?.city}  ${r?.address?.postal_code}  `




}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

        
    )
}

export default HospitalTable
 