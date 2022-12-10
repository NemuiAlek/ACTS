import { useEffect, useState, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const linkStyle = {
    textDecoration: "none",
    color: 'black',
    'fontWeight': 'bold',
}

export default function LogIn(){
    const navigate = useNavigate();
/*
======================== STATES ======================
*/
const [formState, setFormState] = useState({
    username: "",
    password: "",
});

const [errorMessage, setMessage] = useState('')

/*
======================== FUNCTIONS ======================
*/

const updateInput = (e, thingToUpdate) => {
    setFormState({ ...formState, [thingToUpdate]: e.target.value });
};


const LoginSubmit = (event) => {

    event.preventDefault();

    axios
    .post(
        "http://localhost:4000/users/login",
        {
            userName: formState.username,
            password: formState.password,
        },{withCredentials: true}
    ).then((msg) =>{
        console.log(msg)
        if(msg.data === "Successfully logged in") {
            navigate("/");
            window.location.reload();
        } else {
            setMessage(msg.data)
        }
        
    }).catch(err => console.log(err))
    
}

/*
======================== USE EFFECTS ======================
*/
useEffect(() => {
  console.log(errorMessage)
  
}, [errorMessage])


/*
======================== HTML(JSX) ======================
*/

    return (
        <div className="homePage">
    
        <h1>Log In Page</h1>
        <p><Link to={"/"} style={linkStyle}>Home</Link></p>

        <form>
        {<p>{errorMessage}</p>}
        <p>UserName/Email</p>
        <input id="usernameInput"
        type="text"
		value={formState.username}
		onChange={(e) => {
		updateInput(e, "username");
		}}></input>

        <p>Password</p>
        <input 
        type="password" id="passwordInput"
		value={formState.password}
		onChange={(e) => {
		updateInput(e, "password");
		}}></input>

        <br></br>
        <br></br>

        <button onClick={LoginSubmit}>Submit</button>
        </form>

        </div>
    )
    }