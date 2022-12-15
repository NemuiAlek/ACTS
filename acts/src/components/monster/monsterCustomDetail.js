import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import axios from "axios"


export default function MonsterStandard(){

    const navigate = useNavigate();
    const params = useParams()
    const { theUser, getUserInfo } = useContext(UserContext);   
/*
======================== STATES ======================
*/

const [monster, setMonster] = useState([])


/*
======================== FUNCTIONS ======================
*/

const getMonster = () =>{
    axios
    .get("http://localhost:4000/monsters/" + params.id, {
    })
    .then((response) => {
        setMonster(response.data);
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err);
    });
}

const updateMonster = (event) =>{
    event.preventDefault();
    navigate('/monster/create-modify/'+params.id)
}

/*
======================== USE EFFECTS ======================
*/

useEffect(() => {
    getMonster();
}, [])

/*
======================== HTML(JSX) ======================
*/
    return (
        <div className="monsterPage">
    
        <h1>{monster.monsterName}</h1>

            <p>{monster.MonsterDescription}</p>

        {theUser && theUser.id === monster.CreatedBy && (
            <button className="profileEditOptions" onClick={updateMonster}>Update</button>
        )}
        

        </div>
    )
}