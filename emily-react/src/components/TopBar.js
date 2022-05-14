import React from 'react'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./style.css"
import "./../index.css"

function TopBar(props) {
    return (
        <div>
            <div className='topbar'>
                <div className='route-name'>
                    <div>Pages / {props.pageName}</div>
                    <h1 className='text-xl font-bold'>{props.pageName}</h1>
                </div>
                <div className='user-actions'>
                    <TextField className='input-field search-input' variant="outlined" size="small"InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),
                    }}></TextField>
                    <div className='route-name action-items ml-3 cursor-pointer'>
                        <PersonIcon />
                        <div>Sign In</div>
                    </div>
                    <div className='route-name ml-3 cursor-pointer'>
                        <SettingsIcon />
                    </div>
                    <div className='route-name ml-3 cursor-pointer'>
                        <NotificationsIcon />
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default TopBar
 