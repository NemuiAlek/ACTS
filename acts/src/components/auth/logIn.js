import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    'fontWeight': 'bold',
}

export default function LogIn(){
    return (
        <div className="homePage">
    
        <h1>Log In Page</h1>
        <p><Link to={"/"} style={linkStyle}>Home</Link></p>

        <form>
        <p>UserName/Email</p>
        <input></input>
        <p>Password</p>
        <input></input>
        <br></br>
        <br></br>
        <button>Submit</button>
        </form>

        </div>
    )
    }