import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios"


export default function MonsterStandard(){

    const navigate = useNavigate();
    const params = useParams()
/*
======================== STATES ======================
*/

const [monsters, setMonsters] = useState([])
const [search, setSearch] = useState('')

/*
======================== FUNCTIONS ======================
*/

const getMonsters = () =>{
    axios
    .get("http://localhost:4000/monsters/", {
    })
    .then((response) => {
        setMonsters(response.data);
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

const updateInput = (e) => {
    setSearch(e.target.value);
};

/*
======================== USE EFFECTS ======================
*/

useEffect(() => {
    getMonsters();
}, [])

const getDetails = (id) => {
    navigate('/monster/custom/'+id)
}

/*
======================== HTML(JSX) ======================
*/
    return (
        <div className="monsterPage">
    
        <h1>Standard Monsters</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
		        onChange={(e) => {
		        updateInput(e);
		        }} />

        <div className="allContainers">
        {monsters.filter((eachMonster) => eachMonster.monsterName.toLowerCase().includes(search.toLowerCase()))
            .map((eachMonster) => (
                <div className="monsterContainer" key={eachMonster.id} onClick={() => getDetails(eachMonster.id)}>
                    <h5>{eachMonster.monsterName}</h5>
                    <p>{eachMonster.id}</p>
                </div>))
        }
        </div>

        </div>
    )
}