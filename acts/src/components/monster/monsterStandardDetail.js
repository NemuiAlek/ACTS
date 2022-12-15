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
    actions: [],
    alignment: "chaotic evil",
    armor_class: 14,
    armor_desc: "natural armor",
    challenge_rating: "7",
    charisma: 10,
    charisma_save: null,
    condition_immunities: "paralyzed, restrained",
    constitution: 20,
    constitution_save: null,
    damage_immunities: "cold",
    damage_resistances: "acid; bludgeoning, piercing, and slashing from nonmagical attacks",
    damage_vulnerabilities: "",
    dexterity: 8,
    dexterity_save: null,
    document__license_url: "http://open5e.com/legal",
    document__slug: "tob2",
    document__title: "Tome of Beasts 2 OGL",
    group: null,
    hit_dice: "10d12+50",
    hit_points: 115,
    img_main: null,
    intelligence: 7,
    intelligence_save: null,
    languages: "understands Common but can’t speak",
    legendary_actions: "",
    legendary_desc: "",
    name: "A-mi-kuk",
    perception: 5,
    reactions: "",
    senses: "darkvision 60 ft., tremorsense 30 ft., passive Perception 15",
    size: "Huge",
    skills: {athletics: 10, perception: 5, stealth: 2},
    slug: "a-mi-kuk",
    special_abilities:[],
    speed:{swim: 40, burrow: 20, walk: 30},
    spell_list: [],
    strength: 21,
    strength_save: null,
    subtype: "",
    type: "aberration",
    wisdom: 14,
    wisdom_save: null,
    })
const [loading, setLoading] = useState(false)

let speedValues

/*
======================== FUNCTIONS ======================
*/

const getMonster = () =>{
    axios
    .get("https://api.open5e.com/monsters/" + params.id, {
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
                    <h2>{monster.size} {monster.type}, {monster.alignment}</h2>
                </div>  
                <svg height="5" width="100%" className="tapered-rule">
                <polyline points="0,0 400,2.5 0,5"></polyline>
            </svg>
                <div className="top-stats">
                    <div className="property-line first">
                        <h4>Armor Class </h4>
                        <p>{monster.armor_class} {monster.armor_desc}</p>
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
             
                    {(monster.strength_save !== null || monster.dexterity_save !== null || monster.constitution_save !== null ||
                     monster.intelligence_save !== null || monster.wisdom_save !== null || monster.charisma_save !== null) && (
                    <div className="property-line">
                        <h4>Saving Throws </h4>
                        <p>
                        {monster.strength_save !== null ? `STR +${monster.strength_save}  ` : ''}
                        {monster.dexterity_save !== null ? `DEX +${monster.dexterity_save}  ` : ''}
                        {monster.constitution_save !== null ? `CON +${monster.constitution_save}  ` : ''}
                        {monster.intelligence_save !== null ? `INT +${monster.intelligence_save}  ` : ''}
                        {monster.wisdom_save !== null ? `WIS +${monster.wisdom_save}  ` : ''}
                        {monster.charisma_save !== null ? `CHA +${monster.charisma_save}  ` : ''}
                        </p>
                    </div> 
                    )}

                    {monster.skills !== 0 && 
                    <div className="property-line">
                        <h4>Skills </h4>
                        {Object.entries(monster.skills).map((array)=>(
                                <p key={array[0]}>{array[0]} {array[1]}  </p>
                        ))
                        }
                    </div> 
                    }

                    {monster.damage_vulnerabilities.length !== 0 && 
                    <div className="property-line">
                        <h4>Damange Vulnerabilities </h4>
                        <p>{monster.damage_vulnerabilities}</p>
                    </div> 
                    }


                    {monster.damage_immunities.length !== 0 && 
                    <div className="property-line">
                        <h4>Damage Immunities </h4>
                        <p>{monster.damage_immunities}</p>
                    </div> 
                    }

                    {monster.condition_immunities.length !== 0 && 
                    <div className="property-line">
                        <h4>Condition Immunities </h4>
                        <p>{monster.condition_immunities}</p>
                    </div> 
                    }

                    {monster.senses.length !== 0 && 
                    <div className="property-line">
                        <h4>Senses </h4>
                        <p>{monster.senses}</p>
                    </div> 
                    } 

                    <div className="property-line">
                        <h4>Languages </h4>
                        <p>{monster.languages}</p>
                    </div> 
                       
                    <div className="property-line last">
                        <h4>Challenge </h4>
                        <p>{monster.challenge_rating}</p>
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
                    {monster.legendary_desc}
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