import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import './Login.css'
import { Navigate, Redirect,  BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";


const clientId ='247030326696-p2qcar48mkrn9l6f0ogqfp35kl6hislj.apps.googleusercontent.com';



function Login() {



  const navigate = useNavigate();
  let loggedIn = false;
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );


const handleFailure = (result) => {
  console.log(result);
};



const handleLogin = async (googleData) => {
    const res = await fetch('/api/v1/google-login', {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.tokenId,
    }),
    headers: {
        'Content-Type': 'application/json',
    },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
    //console.log(loginData.userID);
    //loggedIn = true;
    //console.log(data.userID);
    navigate({pathname:"/dashboard", search:data.userID});
    
};


const handleLogout = () => {
  localStorage.removeItem('loginData');
  setLoginData(null);
  loggedIn = false;
  navigate({pathname:"/map"});
};

  

  return (
    <div>
      {loginData ? (
            <div>
              {/*<Navigate to={{pathname:'/dashboard', state: {id: loginData.userId}}}/>*/}
              <div id='logoutmessage'><h1>You logged in as {loginData.email}</h1></div>
              <br></br>
              <div id='logoutbutton'><GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={handleLogout} /></div>
            </div>
          ) : (
      <div id='loginbutton'><GoogleLogin
        clientId={clientId} 
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />     
      </div>
          )}
    </div>
  );
}

export default Login;