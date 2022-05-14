import React, {useState, useEffect} from 'react'
import axios from 'axios'
import map from './../images/map.png'
import Button from '@mui/material/Button';
import "./style.css"
import "./../index.css"
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import HospitalResults from '../components/HospitalResults'
import { useParams, useSearchParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar';

function Map() {

    const [searchParams] = useSearchParams();
    let userID = "";
    for (const entry of searchParams.entries()) {
        //console.log(entry);
        userID = entry[0];
        break;
    }
    console.log("userID from Map.js");
    console.log(userID);
    
    /*const hospitals = [
        {
            name:'St.Micheal\'s Hospital',
            address:'123 Street Name, City, Postal',
            id:'1',
            waitTime:12,
        },
        {
            name:'Toronto Western Hospital',
            address:'123 Street Name, City, Postal',
            id:'2',
            waitTime:45,
        },
        {
            name:'Toronto General Hospital',
            address:'123 Street Name, City, Postal',
            id:'3',
            waitTime:120,
        }
    ]*/
    const [hospitals, setHospitals] = useState([{}])
    
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
            },
        },
    };
    const [search,setName] = React.useState([]); // data
    var [postal, setPostal] = useState(''); 
    const serviceTags = [
        'emergency',
        'covid testing',
        'bloodwork',
        'surgery',
        'mri',
        'x-ray',
        'radiation therapy',
        'chemotherapy',
        'cardiology',
        'respirology',
        'dermatology',
        'opthmology'
    ]

    // functions
    function handleSearch(e) {
        const {
        target: { value },
        } = e;

        setName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    }

    function searchSubmit() {
        console.log('search', postal, search)
        let hospitalsUrl
        if(postal != "")
        {
            hospitalsUrl = `/api/v1/hospitalsearch?location=${postal}`
        }
        else
        {
            hospitalsUrl = `/api/v1/hospitalsearch`
        }
        if(search.length != 0 || postal != "")
        {
            console.log("here")
            axios.post(hospitalsUrl, {
                services: search
            }).then(response => {
                setHospitals(response.data?.hospitals) // pass it the new state
                console.log(response)
                console.log(response.data)
                console.log(response?.data)

                console.log(response.data?.hospitals)
            })
        }
        /*
        Try:
        hospitalsUrl = '/api/v1/hospitalsearch?location=${m5g}'
        services: ["x-ray"]
        */
    }

    return (
        
        <div>
             <div id='sidebarr'><Sidebar userID={userID} /></div>
            <div className='page-style'>
                <div className="mx-auto container flex justify-center">
                    <div className='text-center'>
                        <div className="text-4xl font-bold">Welcome!</div>
                        <div className='mt-3'>Use Emily to find the best health care services near you</div>
                    </div>
                </div>
                <div className='mt-5 relative'>
                    <div className='absolute w-full p-5'>
                        <div className='flex'>
                            <div className='w-3/5 flex'>
                                <div className='w-full flex'>
                                    <div className='flex-1'>
                                        <Select placeholder="Input postal code or service tags" className='input-field search-input w-full' variant="outlined" size="small" 
                                            multiple
                                            value={search}
                                            onChange={handleSearch}
                                            renderValue={(selected) => selected.join(', ')}
                                            MenuProps={MenuProps}
                                        >
                                            {serviceTags?.map((service) => (
                                                <MenuItem key={service} value={service}>
                                                <Checkbox checked={search.indexOf(service) > -1} />
                                                <ListItemText primary={service} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </div>
                                    <div className='flex-1 mx-3'>
                                        <TextField onChange={(e) => setPostal(postal = e.target.value)} className='input-field search-input w-full' variant="outlined" size="small"InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}></TextField>
                                    </div>
                                </div>
                                <div className='w-35'>
                                    <Button onClick={searchSubmit} variant="contained">SEARCH</Button>
                                </div>
                            </div>
                            <div className='w-2/5 ml-3'>
                                <HospitalResults hospitals={hospitals}></HospitalResults>
                            </div>
                        </div>
                    </div>
                    <img className='map-img' src={map} alt="" />
                </div>
                <div className='mt-5 flex justify-center'>
                    <div className='text-center'>
                        <Button variant="contained" href='/login'>SIGN IN</Button>
                        <div className='text-lg mt-3'>Register with</div>
                        <div className='grid grid-cols-3 gap-5'>
                            <div className='cursor-pointer rounded-lg p-2 border-solid border-2'>
                                <AppleIcon />
                            </div>
                            <div className='cursor-pointer rounded-lg p-2 border-solid border-2'>
                                <GoogleIcon onClick={() => window.open('/login', '_self')} />
                            </div>
                            <div className='cursor-pointer rounded-lg p-2 border-solid border-2'>
                                <FacebookIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Map
 