import React, { useState,useEffect} from 'react';
import axios from 'axios'
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
import DataService from "../services"

function BookVaccine() {
    /*const rows = [
        {
            name:'St.Micheal\'s Hospital',
            address:'123 Street Name, City, Postal',
            url:'asdfasfd',
            id:'1'
        },
        {
            name:'Toronto Western Hospital',
            address:'123 Street Name, City, Postal',
            url:'asdfasfd',
            id:'2'
        },
        {
            name:'Toronto General Hospital',
            address:'123 Street Name, City, Postal',
            url:'asdfasfd',
            id:'3'
        }
    ]*/

    const [hospitals, setHospitals] = useState([{
        name:'',
        address: {street: ''},
        url:'',
        id:''
    }])

    useEffect(() => {
        let hospitalsUrl
        hospitalsUrl = `/api/v1/hospitalsearch?location=m5g`
        axios.post(hospitalsUrl).then(response => {
            setHospitals(response.data?.hospitals) // pass it the new state
        })
    },[] )


    return (
        <div>
            <div className='rounded shadow info-card p-3'>
                <div className='text-lg font-bold'>Book your Covid-19 Booster shot now</div>
                <div className='flex justify-end mb-5'>
                    <Button variant="contained" size="small">SEE ALL</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Hospital</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hospitals.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        {row.name}
                                    </TableCell>
                                    <TableCell>
                                        {row.address.street}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" size="small">BOOK NOW</Button>
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

export default BookVaccine
 