import { useEffect, useState, useContext } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Captcha from '../../API/captcha';

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    'fontWeight': 'bold',
};

export default function SignUp(){


	const [formState, setFormState] = useState({
		username: "",
        email: "",
		password: "",
        confirmPassword: ""
	});

/*
const captchaCall = x =>{
    Captcha('https://www.google.com/recaptcha/api.js');
}
*/

const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
};

const submitSignupForm = (event) => {

    event.preventDefault();


    axios
        .post(
            "http://localhost:4000/users/signup",
            {
                userName: formState.username,
                email: formState.email,
                password: formState.password,
                confirmPassword: formState.confirmPassword,
                role: 'admin'
            },
            { withCredentials: true }
        )
        .then((response) => {
            console.log(response)//getUserInfo();
        })
        .catch((err) => {
            console.log(err);
        });

console.log('not yet!');
console.log(formState)
};



    return (
        <div className="homePage">
    
        <h1>Sign Up</h1>
        <p><Link to={"/"} style={linkStyle}>Home</Link></p>

        <div className="username">
        <form>
        <p>UserName</p>
        <input 
        type="text"
		value={formState.username}
		onChange={(e) => {
		updateInput(e, "username");
		}}></input>

        <p>Email</p>
        <input 
        type="text"
		value={formState.email}
		onChange={(e) => {
		updateInput(e, "email");
		}}></input>

        <p>Password</p>
        <input 
        type="text"
		value={formState.password}
		onChange={(e) => {
		updateInput(e, "password");
		}}></input>

        <p>Confirm Password</p>
        <input 
        type="text"
		value={formState.confirmPassword}
		onChange={(e) => {
		updateInput(e, "confirmPassword");
		}}></input>

        <br></br>
        <br></br>
        
        <button onClick={submitSignupForm}>Submit</button>
        </form>
        </div>

    
        </div>
    )
    }