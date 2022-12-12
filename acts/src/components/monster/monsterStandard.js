import { useEffect, useState, useContext } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"


export default function MonsterStandard(){

    const navigate = useNavigate();
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
    .get("https://www.dnd5eapi.co/api/monsters", {
    })
    .then((response) => {
        setMonsters(response.data.results);
        console.log(monsters);
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
    navigate('/monster/'+id)
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
        {monsters.filter((eachMonster) => eachMonster.name.toLowerCase().includes(search.toLowerCase()))
            .map((eachMonster) => (
                <div className="monsterContainer" key={eachMonster.index} onClick={() => getDetails(eachMonster.index)}>
                    <h5>{eachMonster.name}</h5>
                    <p>{eachMonster.index}</p>
                </div>))
        }
        </div>

        </div>
    )
}