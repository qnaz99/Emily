import React from 'react'
import "./style.css"
import "./../index.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Outlet, Link } from "react-router-dom";
// import dp from './../images/dp.png'
import Button from '@mui/material/Button';

function HospitalResults(props) {
    
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hospital</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Wait Time</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.hospitals?.map((hospital) => (
                        <TableRow key={hospital?.id}>
                            <TableCell>
                                {hospital?.name}
                            </TableCell>
                            <TableCell>
                                {hospital.address?.street}
                            </TableCell>
                            <TableCell>
                                {`${hospital?.estWaitTime} min`}
                            </TableCell>
                            <TableCell>
                                <Link to="/checkin">
                                    <Button variant="contained" size="small">CHECK IN</Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Outlet />
        </TableContainer> 
    )
}

export default HospitalResults
 