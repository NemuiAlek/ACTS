import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    'font-weight': 'bold',
}

export default function MonsterDirectory(){
    return (
        <div className="homePage">
    
        <h1>MonsterDirectory</h1>
        <p><Link to={"/"} style={linkStyle}>Home</Link></p>
    
        </div>
    )
    }