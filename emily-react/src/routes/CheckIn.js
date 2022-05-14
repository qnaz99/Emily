import React, {useState} from 'react'
import background from './../images/Background.png'
import TopBar from './../components/TopBar.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "./style.css"
import "./../index.css"
import Sidebar from "../components/Sidebar"


function CheckIn() {
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

    const allergies = [
        'grass',
        'nuts',
        'milk',
        'dust',
        'ibuprofen',
        'mold'
    ]

    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        age:0,
        sex:'',
        weight:0,
        height:0,
        postalCode:'',
        healthCardNum:'',
        medicalAllergies:[],
        emergencyContact:'',
        services:[]
    })

    function updateFirstName(e) {
        let obj = {firstName:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateLastName(e) {
        let obj = {lastName:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }
    
    function updateSex(e) {
        let obj = {sex:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateAge(e) {
        let obj = {age:parseInt(e.target.value)}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateHeight(e) {
        let obj = {height:parseInt(e.target.value)}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateWeight(e) {
        let obj = {weight:parseInt(e.target.value)}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updatePostal(e) {
        let obj = {postalCode:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateCard(e) {
        let obj = {healthCardNum:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function updateContact(e) {
        let obj = {emergencyContact:e.target.value}

        setUser(user => ({
            ...user,
            ...obj
        }))
    }

    function changeAllergies(e, allergy) {
        if(user.medicalAllergies.includes(allergy)) {
            let arr = user.medicalAllergies
            let index = arr.findIndex(x => x === allergy)
            arr.splice(index, 1)
            let obj = {medicalAllergies:arr}

            setUser(user => ({
                ...user,
                ...obj
            }))

        } else {
            let arr = user.medicalAllergies
            arr.push(allergy)

            let obj = {medicalAllergies:arr}

            setUser(user => ({
                ...user,
                ...obj
            }))
        }
    }

    function changeTag(e, tag) {
        if(user.services.includes(tag)) {
            let arr = user.services
            let index = arr.findIndex(x => x === tag)
            arr.splice(index, 1)
            let obj = {services:arr}

            setUser(user => ({
                ...user,
                ...obj
            }))

        } else {
            let arr = user.services
            arr.push(tag)

            let obj = {services:arr}

            setUser(user => ({
                ...user,
                ...obj
            }))
        }
    }

    function submit() {
        console.log('user', user)
    }

    return (
        <div>
            <div className='background-holder'>
                <div className='bg'>
                    <img src={background} className='background-img' alt="Test" />
                </div>   
            </div>
            <div className='page-style'>
                <TopBar pageName={"Check In"}/>
                <div className='text-center mt-40 text-4xl font-bold white-text'>Check In Form</div>
                <div className='shadow-md rounded mt-10 bg-white border-inherit p-5'>
                    <div className='grid grid-cols-3 gap-10'>
                        <div>
                            <TextField onChange={(e) => updateFirstName(e)} required variant="standard" className='w-full' size="small" placeholder="Enter First Name" label="First Name"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateLastName(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Last Name" label="Last Name"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateSex(e)} required variant="standard" className='w-full' size="small" placeholder="Sex" label="Sex"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateAge(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Age" label="Age"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateHeight(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Height" label="Height"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateWeight(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Weight" label="Weight"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updatePostal(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Postal Code" label="Postal Code"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateCard(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Health Card Number" label="Health Card Number"></TextField>
                        </div>
                        <div>
                            <TextField onChange={(e) => updateContact(e)} required variant="standard" className='w-full' size="small" placeholder="Enter Emergency Contact" label="Emergency Contact"></TextField>
                        </div>
                    </div>
                    <div className='text-lg my-5 underline'>Check all the services that you want to check in</div>
                    <div className='grid grid-cols-6 gap-5'>
                        {serviceTags.map((tag) => {
                            return <FormControlLabel key={tag} label={`${tag}`} control={<Checkbox onChange={(e) => changeTag(e, tag)} />}></FormControlLabel>
                        })}
                    </div>
                    <div className='text-lg my-5 underline'>Check all the allergies that you have</div>
                    <div className='grid grid-cols-6 gap-5'>
                        {allergies.map((allergy) => {
                            return <FormControlLabel key={allergy} label={`${allergy}`} control={<Checkbox onChange={(e) => changeAllergies(e, allergy)} />}></FormControlLabel>
                        })}
                    </div>
                    <div className='justify-end mt-5 flex'>
                        <Button onClick={submit} variant="contained">SUBMIT</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckIn
 