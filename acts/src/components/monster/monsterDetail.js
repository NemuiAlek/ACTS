import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios"


export default function MonsterStandard(){

    const navigate = useNavigate();
    const params = useParams()
/*
======================== STATES ======================
*/

const [monster, setMonster] = useState([])


/*
======================== FUNCTIONS ======================
*/

const getMonster = () =>{
    axios
    .get("https://www.dnd5eapi.co/api/monsters/" + params.id, {
    })
    .then((response) => {
        setMonster(response.data);
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err);
    });
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
    
        <h1>{monster.name}</h1>

            <p>{monster.desc}</p>

        </div>
    )
}