import React, { useState, useEffect } from "react"; //import useState hook
import "./Sidebar.css";
import { Switch, Route, Link } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

// import { useStateValue } from "./StateProvider";

function Sidebar(props) {
  const userId = props.userID;
  const userID = String(userId);
  console.log("userID from sidebar.js");
  console.log(userID);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_top">
          Emily | The Healthcare Finder
        </div>
        <div className="sidebar_content">
        <Link to={{ pathname: "/dashboard", search:userID }} className="nav-link">
          <div className="dashboard">
            
            <LocalHospitalIcon className="sidebar__icon" />

            Dashboard
            
          </div>
</Link>
            <Link to={{ pathname: "/map", search:userID }} className="nav-link">

          <div className="pack1">
            <LocalHospitalIcon className="sidebar__icon" />
            Hospital Search
            {/* <Link to="/" /> */}
          </div>
</Link>

<Link to={{ pathname: "/documents", search:userID }} className="nav-link">
          <div className="pack2">
            <LocalHospitalIcon className="sidebar__icon" />
             Documents
            
           
            {/* <Link to="/" /> */}
          </div>
</Link>
          <div className="pack3">
            <LocalHospitalIcon className="sidebar__icon" />

            My Reviews

            {/* <Link to="/" /> */}
          </div>
          <hr />
          <Link to={{ pathname: "/profile", search:userID }} className="nav-link">
          <div className="pack4">
            <LocalHospitalIcon />
            Update Profile
            {/* <Link to="/" /> */}
          </div>
          </Link>
          <div className="pack5">
            <LocalHospitalIcon />

            Settings
            {/* <Link to="/" /> */}
          </div>

          
          <Link to={{ pathname: "/login", search:userID }} className="nav-link">
          <div className="pack6">
            <LocalHospitalIcon />
            Logout
          </div>
          </Link>
          
        </div>
      </div>
    </>
  );
}

export default Sidebar;
