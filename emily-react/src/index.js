
import React from 'react'
import ReactDOM from 'react-dom'
import UserProfile from "./components/UserProfile"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './routes/Dashboard';
import Map from './routes/Map';
import MyDocuments from './routes/MyDocuments';
import CheckIn from './routes/CheckIn';
import HospitalResults from './components/HospitalResults';
import HospitalTable from './components/HospitalTable';
import Login from './components/Login';
import LoginPage from './components/LoginPage';


const reactContentRoot = document.getElementById('root')



ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Map />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/dashboard" render={(props) => <Dashboard {...props}/>}/>
            <Route path="dashboard/:username" element={<Dashboard />} />
            <Route path="map" element={<Map />} />
            <Route path="documents" element={<MyDocuments />} />
            <Route path="documents/:username" element={<MyDocuments />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="checkin" element={<CheckIn />}></Route>
        </Routes>
    </BrowserRouter>, 
    reactContentRoot); 