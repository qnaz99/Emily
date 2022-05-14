import React from 'react'
import background from './../../images/Background.png'
import dp from './../../images/dp.png'
import TopBar from '../TopBar'

import "./Profile.css"

function Profile(props) {
    if (props.profileName != ""){
        return (
            
            <div>
                    <h3 id="name">{props.profileName}</h3>
                    <div>
                        <img id='bggg' src={background}/>
                    </div>
                    <TopBar pageName='Profile' />
                    
                    <div>
                        <img id='dp' src = {props.pic} />
                    </div>
            </div>

            
        )
    }
    else {
        return (
            <div>
                <img id='bg' src={background}/>
                <form>
                    <input id='search' type="search" placeholder="Search..." />   
                </form>
            </div>
        )
    }
}

export default Profile
 