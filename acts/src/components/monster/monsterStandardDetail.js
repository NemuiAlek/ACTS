import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios"


export default function MonsterStandard(){

    const navigate = useNavigate();
    const params = useParams()
/*
======================== STATES ======================
*/

const [monster, setMonster] = useState({
    actions:[],
    alignment:'',
    armor_class:18,
    challenge_rating:13,
    charisma:17,
    condition_immunities:[],
    constitution:21,
    damage_immunities: [],
    damage_resistances: [],
    damage_vulnerabilities: [],
    dexterity: 10,
    hit_dice: "15d12",
    hit_points: 172,
    hit_points_roll: "15d12+75",
    index: "adult-brass-dragon",
    intelligence: 14,
    languages: "Common, Draconic",
    legendary_actions: [],
    name: "Adult Brass Dragon",
    proficiencies:[],
    senses: {},
    size:"Huge",
    special_abilities:[{usage:{}}],
    speed:{},
    strength:23,
    type:"dragon",
    url:"/api/monsters/adult-brass-dragon",
    wisdom:13,
    xp:10000
    })
const [loading, setLoading] = useState(false)

let speedValues

/*
======================== FUNCTIONS ======================
*/

const getMonster = () =>{
    axios
    .get("https://www.dnd5eapi.co/api/monsters/" + params.id, {
    })
    .then((response) => {
        setMonster(() => response.data);
        setLoading(false);
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

const backBtn = (event) =>{
    event.preventDefault();
    navigate('/monster/standard');
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
    if(loading){
        return(<div>Loading...</div>)
    }
    
    return (
        <div id="monsterPage">
        <button onClick={backBtn}>Back to Monster Dictionary</button>
    
    <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:700" rel="stylesheet" type="text/css" />
<link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic" rel="stylesheet" type="text/css" />

        <div className="stat-block wide">
            <hr className="orange-border" />
            <div className="section-left">
                <div className="creature-heading">
                    <h1>{monster.name}</h1>
                    <h2>{monster.alignment}</h2>
                </div>  
                <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                <div className="top-stats">
                    <div className="property-line first">
                        <h4>Armor Class </h4>
                        <p>{monster.armor_class}</p>
                    </div>  
                    <div className="property-line">
                        <h4>Hit Points </h4>
                        <p>{monster.hit_points} ({monster.hit_dice})</p>
                    </div>  
                    <div className="property-line last">
                        <h4>Speed </h4>
                        {Object.entries(monster.speed).map((array)=>(
                                <p key={array[0]}>{array[0]} {array[1]}  </p>
                        ))
                        }

                    </div>  
                    <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                    <div className="abilities">
                        <div className="ability-strength">
                            <h4>STR</h4>
                            <p>{monster.strength} ({Math.floor((monster.strength-10)/2)})</p>
                        </div>  
                        <div className="ability-dexterity">
                            <h4>DEX</h4>
                            <p>{monster.dexterity} ({Math.floor((monster.dexterity-10)/2)})</p>
                        </div>  
                        <div className="ability-constitution">
                            <h4>CON</h4>
                            <p>{monster.constitution} ({Math.floor((monster.constitution-10)/2)})</p>
                        </div>  
                        <div className="ability-intelligence">
                            <h4>INT</h4>
                            <p>{monster.intelligence} ({Math.floor((monster.intelligence-10)/2)})</p>
                        </div>  
                        <div className="ability-wisdom">
                            <h4>WIS</h4>
                            <p>{monster.wisdom} ({Math.floor((monster.wisdom-10)/2)})</p>
                        </div>  
                        <div className="ability-charisma">
                            <h4>CHA</h4>
                            <p>{monster.charisma} ({Math.floor((monster.charisma-10)/2)})</p>
                        </div>  
                    </div> 
        <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                        
                    <h6 />
                    
                    {monster.proficiencies.length !== 0 && 
                    <div className="property-line">
                        <h4>Saving Throws </h4>
                        {monster.proficiencies.map((array) => (
                            array.proficiency.name.includes('Saving Throw') ? 
                            <p key={array.proficiency.index + 'SavingThrows'}>{array.proficiency.name.slice(array.proficiency.name.length - 3)} +{array.value}, </p> 
                            : ''
                        )) }
                    </div> 
                    }

                    {monster.proficiencies.length !== 0 && 
                    <div className="property-line">
                        <h4>Skills </h4>
                        {monster.proficiencies.map((array) => (
                            array.proficiency.name.includes('Skill') ? 
                            <p key={array.proficiency.index +  'Skills'}>{array.proficiency.name.replace('Skill: ','')} +{array.value}, </p> 
                            : ''
                        )) }
                    </div> 
                    }

                    {monster.damage_vulnerabilities.length !== 0 && 
                    <div className="property-line">
                        <h4>Damange Vulnerabilities </h4>
                        {monster.damage_vulnerabilities.map((array) => (
                            <p key={array}>{array}, </p>
                        )) }
                    </div> 
                    }

                    {monster.damage_immunities.length !== 0 && 
                    <div className="property-line">
                        <h4>Damage Immunities </h4>
                        {monster.damage_immunities.map((array) => (
                            <p key={array + 'Imm'}>{array}, </p>
                        )) }
                    </div> 
                    }

                    {monster.condition_immunities.length !== 0 && 
                    <div className="property-line">
                        <h4>Condition Immunities </h4>
                        {monster.condition_immunities.map((array) => (
                            <p key={array.index}>{array.name}, </p>
                        )) }
                    </div> 
                    }

                    {monster.senses.length !== 0 && 
                    <div className="property-line">
                        <h4>Senses </h4>
                        {Object.entries(monster.senses).map((array)=>(
                                <p key={array[0]}>{array[0]} {array[1]}, </p>
                        ))
                        }
                    </div> 
                    }

                    <div className="property-line">
                        <h4>Languages </h4>
                        <p>{monster.languages}</p>
                    </div> 
                       
                    <div className="property-line last">
                        <h4>Challenge </h4>
                        <p>{monster.challenge_rating} ({monster.xp} XP)</p>
                    </div>  
                </div>  
                <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>

                {monster.special_abilities.map((array) => (
                    <div key={array.name+'specialTopDiv'} className="property-block">
                    <h4 key={array.name+'specialTop'}>{array.name} {array.usage !== undefined ? '(' + array.usage.times+'/Day)' : ''}. </h4>
                    <p key={array.name+'special'}>{array.desc} </p>
                    </div> 
                )) }

                {monster.legendary_actions.length !== 0 &&
                <div className="actions">
                    <h3>Legendary Actions</h3> 
                    <h6 />
                    Monster can take 1-3 legendary actions, choosing from the options below. Only one legendary action
                    option can be used at a time and only at the end of another creature's turn. The monster regains spent legendary actions at the start of its turn.
                    {monster.legendary_actions.map((array) => (
                    <div key={array.name+'specialTopDiv'} className="property-block">
                    <h4 key={array.name+'specialTop'}>{array.name}. </h4>
                    <p key={array.name+'special'}>{array.desc} </p>
                    </div> 
                    )) } 
                </div>
            }
 
            </div>  
            <div className="section-right">
                <div className="actions">
                    <h3>Actions</h3>
                    {monster.actions.map((array) => (
                    <div key={array.name+'specialTopDiv'} className="property-block">
                    <h4 key={array.name+'specialTop'}>{array.name}. </h4>
                    <p key={array.name+'special'}>{array.desc} </p>
                    </div> 
                    )) } 
                </div> 

            <div>  
            <hr className="orange-border bottom" />
            <br />
        </div>
        </div>  
    </div>
</div>
)}