
import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import UserContext from "../contexts/UserContext";

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    'fontWeight': 'bold',
}


export default function Index(){
    const { theUser, logout } = useContext(UserContext);

return (
    <div className="homePage">

    <h1>Advanced Combat Tracking System</h1>

        <div className="links">
            <p><Link to={"/Monster/standard"} style={linkStyle}>Monster Directory</Link></p>
            <p><Link to={"/CombatTracker"}style={linkStyle}>Combat Tracker</Link></p>
            <p><Link to={"/About"}style={linkStyle}>About</Link></p>
        </div>

    {!theUser && (
        <div className="user">
            <p><Link to={"/SignUp"}style={linkStyle}>Sign Up</Link></p>
            <p><Link to={"/LogIn"}style={linkStyle}>Log In</Link></p>
        </div>
    )}

    {theUser && (
        <div className="user">
        <p><a href="#" onClick={logout} style={linkStyle}>Log Out</a></p>
        </div>
    )}


    </div>
)
}