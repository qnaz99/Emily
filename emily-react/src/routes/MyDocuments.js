import background from './../images/Background.png'
import TopBar from './../components/TopBar.js'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import HealthCard from './../components/HealthCard.js';
import AllergiesCard from './../components/AllergiesCard.js'
import "./style.css"
import "./../index.css"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis } from 'recharts';
import React, { useState,useEffect} from 'react';
import Sidebar from "../components/Sidebar"
import AddNewDoc from "../components/AddNewDoc"

import DataService from "../services"
import { useParams, useSearchParams } from 'react-router-dom'
function MyDocuments(props) {
    const [searchParams] = useSearchParams();
    let userID = "";
    for (const entry of searchParams.entries()) {
        //console.log(entry);
        userID = entry[0];
        break;
    }
    console.log("userID from MyDocuments.js");
    console.log(userID);


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
    },[userID] )
    
    

console.log(user?.weight)
    const files = [
        { name:'Vaccine Receipt 1',date:'May 14, 2022',id:'1'}]
    
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
 

const bmi_warning=()=>{
if(user?.bmi>25)
    return <div className='bg-red-700 text-white inline px-3 py-1 rounded' style={{color:"white"}}>HIGH</div>
else if(user?.bmi>10 && user?.bmi<25)
    return <div className='bg-teal-700 text-white inline px-3 py-1 rounded' style={{color:"white"}}>NORMAL</div>
else
    return <div className='bg-red-700 text-white inline px-3 py-1 rounded' style={{color:"white"}}>LOW</div>
}

const weight_warning=()=>{
    if(user?.weight>200)
        return <div style={{color:"red"}}>HIGH</div>
    else if(user?.weight>135&& user?.weight<200)
        return <div className='bg-teal-700 text-white inline px-3 py-1 rounded' style={{color:"white"}}>NORMAL</div>
    else 
        return <div className='bg-red-700 text-white inline px-3 py-1 rounded' style={{color:"white"}}>LOW</div>
    }


    return (
        <div>
        <Sidebar userID={userID}/>
            <div className='background-holder'>
                <div className='bg'>
                    <img src={background} className='background-img' alt="Test" />
                </div>   
            </div>
            <div className='page-style'>
                <TopBar pageName={"My Documents"}/>
                <div className='mt-10 flex'>
                    <HealthCard user={user} />
                    <div className="ml-3 flex-1">
                        <AllergiesCard user={user} />   
                    </div>
                </div>
                <div className='flex mt-8'>
                    <div className='w-3/5 mr-3'>
                        <div className='grid grid-cols-3 gap-5'>
                            <div className='rounded-lg shadow p-5 info-card'>
                                <div className='font-bold text-lg'>BMI</div>
                                <div className='flex items-center mt-5 mb-3'>
                                    <div className='font-bold text-4xl'>{user?.bmi}</div>
                                    <div className='ml-3'> Units</div>
                                </div>
                                {bmi_warning()}

                                <div className='w-full mt-3'>
                                    <LineChart width={200} height={200} data={data}>
                                        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                                    </LineChart>
                                    
                                </div>
                            </div>
                            <div className='rounded-lg shadow p-5 info-card'>
                                <div className='font-bold text-lg'>Height</div>
                                <div className='flex items-center mt-5 mb-3'>
                                    <div className='font-bold text-4xl'>{user?.height}</div>
                                    <div className='ml-3'>cm</div>
                                </div>
                                <div className='bg-teal-700 text-white inline px-3 py-1 rounded'>NORMAL</div>
                                <div className='w-full mt-3'>
                                    <LineChart width={200} height={200} data={data}>
                                        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>
                            <div className='rounded-lg shadow p-5 info-card'>
                                <div className='font-bold text-lg'>Weight</div>
                                <div className='flex items-center mt-5 mb-3'>
                                    <div className='font-bold text-4xl'>{user?.weight}</div>
                                    <div className='ml-3'>lbs</div>
                                </div>
                                {weight_warning()}
                                <div className='w-full mt-3'>
                                    <LineChart width={200} height={200} data={data}>
                                        <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
                                    </LineChart>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8 bg-white rounded shadow p-5'>
                            <div className='font-bold text-xl mb-5'>Activity Growth</div>
                            <div>
                                <BarChart width={800} height={300} data={data}>
                                    <XAxis dataKey="name"  />
                                    <YAxis />
                                    <Bar dataKey="visitors" barSize={30} fill="#8884d8"/>
                                </BarChart>
                            </div>
                        </div>
                    </div>
                    <div className='w-2/5 ml-3 h-full'>
                        <div className='p-5 bg-white rounded shadow h-full'>
                            <div className='font-bold text-xl mb-3'>My Documents</div>
                            
                            <div className="documents">
                                <AddNewDoc/>
                                <AddNewDoc/>
                                <AddNewDoc/>
                            </div>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Document Name</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {files.map((file) => (
                                            <TableRow key={file.id}>
                                                <TableCell>
                                                    {file.name}
                                                </TableCell>
                                                <TableCell>
                                                    {file.date}
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="contained">VIEW</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='flex justify-end mt-3'>
                                <Button variant="contained">ADD DOCUMENTS</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyDocuments
 