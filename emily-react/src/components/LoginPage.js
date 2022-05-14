import React from 'react'
import Profile from './Profile/Profile'
import Field from './Field/Field'
import background from './../images/LoginBg.png'
import TopBar from './TopBar'
import Login from './Login'
import './LoginPage.css'



function LoginPage(){

    return(
        <div>
            <div>
                <img id='bgg' src={background}/>
            </div>
            <div id='rectangle1'></div>
            <h2>Welcome!</h2>
            <h4 id='header'>Sign in with Google:</h4>
            <div id='login'><Login /></div>
            <div id='topbar'><TopBar pageName='Login'/></div>
        </div>
    )
}

export default LoginPage