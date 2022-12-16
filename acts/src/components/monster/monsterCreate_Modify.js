import { useEffect, useState, useContext } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios"
import UserContext from "../../contexts/UserContext"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export default function MonsterStandard(){

    const { theUser, getUserInfo } = useContext(UserContext);  
    const navigate = useNavigate();
    const params = useParams()
/*
======================== STATES ======================
*/

const [monster, setMonster] = useState({
    id:0,
    actions: [],
    alignment: "",
    armor_class: 0,
    armor_desc: "",
    challenge_rating: "0",
    charisma: 10,
    charisma_save: '',
    condition_immunities: "",
    constitution: 10,
    constitution_save: '',
    damage_immunities: "",
    damage_resistances: "",
    damage_vulnerabilities: "",
    dexterity: 10,
    dexterity_save: '',
    document__license_url: "",
    document__slug: "",
    document__title: "",
    hit_dice: "",
    hit_points: 0,
    intelligence: 10,
    intelligence_save: '',
    languages: "",
    legendary_actions: "",
    legendary_desc: "",
    name: "New Monster",
    perception: 0,
    reactions: "",
    senses: "",
    size: "",
    skills: [],
    slug: "",
    special_abilities:[],
    special_abilitiesInputName:'',
    special_abilitiesInputDesc:'',
    speed:[],
    speedInputName:'',
    speedInputModifier:0,
    spell_list: [],
    strength: 10,
    strength_save: '',
    subtype: "",
    type: "",
    wisdom: 10,
    wisdom_save: '',
    CreatedBy:0
})
const [newID, setForm] = useState(false)
const [arrayID, setArray] = useState({
    speed:0,
    skills:0,
    special_abilities:0,
    actions:0,
    legendary_actions:0
})


/*
======================== FUNCTIONS ======================
*/

const updateInput = (e, thingToUpdate) => {
    setMonster({ ...monster, [thingToUpdate]: e.target.value });
};

const getMonster = () =>{
    axios
    .get("http://localhost:4000/monsters/" + params.id, {
    })
    .then((response) => {
        setMonster(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

const newMonster = () =>{
    setForm(true)
}

const submitBtn = (event) => {

    event.preventDefault();

    // fix this later plz
    const monName = monster.monsterName.replace(/'/g,"''");
    const monTitle = monster.Title.replace(/'/g,"''");
    const monmon = monster.Title.replace(/'/g,"''")

    axios
    .post("http://localhost:4000/monsters/create-update/" + params.id, 
    {
        data: monster
    })
    .then((response) => {
        console.log(response);
        window.location.reload();;
    })
    .catch((err) => {
        console.log(err);
    });
}


const deleteMonster = () =>{
    axios
    .post("http://localhost:4000/monsters/delete/" + params.id, {
    })
    .then((response) => {
        console.log(response);
        navigate('/monster/custom');
        window.location.reload();;
    })
    .catch((err) => {
        console.log(err);
    });
}

const upadateSpeed = (id, name, modifier) => {
    setArray((x) => ({...x,speed: id}))
    setMonster((x) => ({...x,speedInputName: name}));
    setMonster((x) => ({...x,speedInputModifier: modifier}));
}

const submitArray = (event, array) => {
    event.preventDefault();
    axios
    .post("http://localhost:4000/monsters/create-update-array/" + arrayID.speed.toString(), 
    {
        monsterID:params.id,
        arrayName: array,
        name: monster.speedInputName,
        modifier: monster.speedInputModifier
        
    })
    .then((response) => {
        setArray((x) => ({...x,speed: 0}))
        setMonster((x) => ({...x,speedInputName: ''}));
        setMonster((x) => ({...x,speedInputModifier: ''}));
        getMonster();
    })
    .catch((err) => {
        console.log(err);
    });

}

const deleteArray = (event, array) => {
    event.preventDefault();
    axios
    .post("http://localhost:4000/monsters/create-update-delete/" + arrayID.speed.toString(), 
    {
        monsterID:params.id,
        arrayName: array
    })
    .then((response) => {
        setArray((x) => ({...x,speed: 0}))
        setMonster((x) => ({...x,speedInputName: ''}));
        setMonster((x) => ({...x,speedInputModifier: ''}));
        getMonster();
    })
    .catch((err) => {
        console.log(err);
    });

}

/*
======================== USE EFFECTS ======================
*/

useEffect(() => {
    if(params.id === 'new'){
        newMonster();
        return
    } else {
        getMonster();
        console.log(monster)
    }
}, [])

/*
======================== HTML(JSX) ======================
*/
    return (

<div id="monsterTopButtons">
{newID && (
        <div>
            <Button variant="success" className="profileEditOptions" onClick={submitBtn}>Create</Button>
        </div>
        )}
        
        {!newID && (
        <div>
            <Button variant="success" className="profileEditOptions" size="lg" onClick={submitBtn}>Update</Button>
            <Button variant="danger" className="profileEditOptions" onClick={deleteMonster}>Delete</Button>
        </div>
        )}

    <div id="updateCreatePage">

    <div id="monsterInput">
        <form>
        <hr />
        <div className="inputGrouping">
            <div className="inputField large">
                <label>Name</label>
                <input 
                    type="text"
                    value={monster.name}
                    onChange={(e) => {
                    updateInput(e, "name");
                    }} /> 
            </div>
            <div className="inputField small">
                <label>Size</label>
                <input 
                    type="text"
                    value={monster.size}
                    onChange={(e) => {
                    updateInput(e, "size");
                    }} />
            </div>
            <div className="inputField small">   
                <label>Type</label>
                <input 
                    type="text"
                    value={monster.type}
                    onChange={(e) => {
                    updateInput(e, "type");
                    }} />
            </div>
            <div className="inputField medium">  
                <label>Alignment</label>
                <input 
                    type="text"
                    value={monster.alignment}
                    onChange={(e) => {
                    updateInput(e, "alignment");
                    }} />
            </div>
        </div>
        <hr />
        <div className="inputGrouping">
            <div className="inputField xsmall">  
                <label>Armor Class</label>
                <input 
                    type="number"
                    value={monster.armor_class}
                    onChange={(e) => {
                    updateInput(e, "armor_class");
                    }} /> 
            </div>
                
            <div className="inputField xsmall"> 
                <label>Hit Points</label>
                <input 
                    type="number"
                    value={monster.hit_points}
                    onChange={(e) => {
                    updateInput(e, "hit_points");
                    }} />
            </div>

            <div className="inputField medium"> 
                <label>Hit Points (rolled)</label>
                <input 
                    type="text"
                    value={monster.hit_dice}
                    onChange={(e) => {
                    updateInput(e, "hit_dice");
                    }} />
            </div>
        </div>
        <hr />
        <div className="inputGrouping">
            <div className="inputField xsmall"> 
                <label>Strength</label>
                <input 
                    type="number"
                    value={monster.strength}
                    onChange={(e) => {
                    updateInput(e, "strength");
                    }} />
            </div>
            <div className="inputField xsmall"> 
                <label>Dexterity</label>
                <input 
                    type="number"
                    value={monster.dexterity}
                    onChange={(e) => {
                    updateInput(e, "dexterity");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Constitution</label>
                <input 
                    type="number"
                    value={monster.constitution}
                    onChange={(e) => {
                    updateInput(e, "constitution");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Inteligence</label>
                <input 
                    type="number"
                    value={monster.intelligence}
                    onChange={(e) => {
                    updateInput(e, "intelligence");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Wisdom</label>
                <input 
                    type="number"
                    value={monster.wisdom}
                    onChange={(e) => {
                    updateInput(e, "wisdom");
                    }} />
            </div>
            <div className="inputField xsmall"> 
                <label>Charisma</label>
                <input 
                    type="number"
                    value={monster.charisma}
                    onChange={(e) => {
                    updateInput(e, "charisma");
                    }} /> 
            </div>
        </div>
        <hr />
        <div className="inputGrouping">
            <div className="inputField xsmall"> 
                <label>Str Save</label>
                <input 
                    type="number"
                    value={monster.strength_save}
                    onChange={(e) => {
                    updateInput(e, "strength_save");
                    }} />
            </div>
            <div className="inputField xsmall"> 
                <label>Dex Save</label>
                <input 
                    type="number"
                    value={monster.dexterity_save}
                    onChange={(e) => {
                    updateInput(e, "dexterity_save");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Con Save</label>
                <input 
                    type="number"
                    value={monster.constitution_save}
                    onChange={(e) => {
                    updateInput(e, "constitution_save");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Int Save</label>
                <input 
                    type="number"
                    value={monster.intelligence_save}
                    onChange={(e) => {
                    updateInput(e, "intelligence_save");
                    }} /> 
            </div>
            <div className="inputField xsmall"> 
                <label>Wis Save</label>
                <input 
                    type="number"
                    value={monster.wisdom_save}
                    onChange={(e) => {
                    updateInput(e, "wisdom_save");
                    }} />
            </div>
            <div className="inputField xsmall"> 
                <label>Cha Save</label>
                <input 
                    type="number"
                    value={monster.charisma_save}
                    onChange={(e) => {
                    updateInput(e, "charisma_save");
                    }} /> 
            </div>
        </div>
        <hr />
        <div className="inputGrouping">
            <div className="inputField xmedium">
                <label>Damage Vulnerabilities</label>
                <input 
                    type="text"
                    value={monster.damage_vulnerabilities}
                    onChange={(e) => {
                    updateInput(e, "damage_vulnerabilities");
                    }} /> 
            </div>
            <div className="inputField xmedium">
                <label>Damage Resistances</label>
                <input 
                    type="text"
                    value={monster.damage_resistances}
                    onChange={(e) => {
                    updateInput(e, "damage_resistances");
                    }} />
            </div>
            <div className="inputField xmedium">   
                <label>Damage Immunities</label>
                <input 
                    type="text"
                    value={monster.damage_immunities}
                    onChange={(e) => {
                    updateInput(e, "damage_immunities");
                    }} />
            </div>
            <div className="inputField xmedium">  
                <label>Condition Immunities</label>
                <input 
                    type="text"
                    value={monster.condition_immunities}
                    onChange={(e) => {
                    updateInput(e, "condition_immunities");
                    }} />
            </div>
        </div>
        <hr />
            
        <div className="inputGrouping"> 
            <div className="inputField large"> 
                <label>Senses</label>
                <input 
                    type="text"
                    value={monster.senses}
                    onChange={(e) => {
                    updateInput(e, "senses");
                    }} />
            </div>               
            <div className="inputField large"> 
                <label>Languages</label>
                <input 
                    type="text"
                    value={monster.languages}
                    onChange={(e) => {
                    updateInput(e, "languages");
                    }} />
            </div> 
            <div className="inputField medium"> 
                <label>Challenge Rating</label>
                <input 
                    type="number"
                    value={monster.challenge_rating}
                    onChange={(e) => {
                    updateInput(e, "challenge_rating");
                    }} />
            </div>
        </div>
        <hr />
    </form>

    <div id="speedInput">
    <form>
    <div className="inputGrouping"> 
            <div className="inputField large"> 
                <label>Speed Type</label>
                <input 
                    type="text"
                    value={monster.speedInputName}
                    onChange={(e) => {
                    updateInput(e, "speedInputName");
                    }} />
            </div>               
            <div className="inputField large"> 
                <label>Movement (feet)</label>
                <input 
                    type="text"
                    value={monster.speedInputModifier}
                    onChange={(e) => {
                    updateInput(e, "speedInputModifier");
                    }} />
            </div> 
            <div className="inputField xsmall"> 
                    <Button variant="success" className="profileEditOptions" onClick={(event) => submitArray(event, 'speed')}>Add</Button>
            </div>
            <div className="inputField xsmall"> 
                    <Button variant="danger" className="profileEditOptions" onClick={(event) => deleteArray(event, 'speed')}>Delete</Button>
            </div>  
    </div>
    <br />
    </form>
    <div className="inputGrouping inputArray">
    <Table className="Table" striped hover size="sm">
            <thead>
                <tr className="monsterListHead">
                    <th>ID</th>
                    <th>Speed Type</th>
                    <th>Movement (feet)</th>
                </tr>
            </thead>
     
            <tbody>
        {monster.speed.map((attribute) => (
                <tr key={attribute.id} onClick={() => upadateSpeed(attribute.id, attribute.name, attribute.modifier)}>
                    <td>{attribute.id}</td>
                    <td>{attribute.name}</td>
                    <td>{attribute.modifier}</td>
                </tr>))
        } 
            </tbody>
        </Table>
    </div>
    <hr />
    </div>




</div>


<div id="monsterSheet">
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
                {isNaN(params.id) &&(
                    monster.speed && (Object.entries(monster.speed).map((array)=>(
                        <p key={array[0]}>{array[0] === 'walk' ? '' : array[0]} {array[1]}ft.,  </p>
                )))
                )}

                {!isNaN(params.id) && monster.speed && ( 
                    monster.speed.map((array) => (
                    <p key={array.id}>{array.name === 'walk' ? '' : array.name} {array.modifier}ft., </p>
                    ))
                )}

            </div>  
            <svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
            <div className="abilities">
                <div className="ability-strength">
                    <h4>STR</h4>
                    <p>{monster.strength} ({Math.floor((monster.strength-10)/2) >= 0 ? `+${Math.floor((monster.strength-10)/2)}` : Math.floor((monster.strength-10)/2)})</p>
                </div>  
                <div className="ability-dexterity">
                    <h4>DEX</h4>
                    <p>{monster.dexterity} ({Math.floor((monster.dexterity-10)/2) >= 0 ? `+${Math.floor((monster.dexterity-10)/2)}` : Math.floor((monster.dexterity-10)/2)})</p>
                </div>  
                <div className="ability-constitution">
                    <h4>CON</h4>
                    <p>{monster.constitution} ({Math.floor((monster.constitution-10)/2) >= 0 ? `+${Math.floor((monster.constitution-10)/2)}` : Math.floor((monster.constitution-10)/2)})</p>
                </div>  
                <div className="ability-intelligence">
                    <h4>INT</h4>
                    <p>{monster.intelligence} ({Math.floor((monster.intelligence-10)/2) >= 0 ? `+${Math.floor((monster.intelligence-10)/2)}` : Math.floor((monster.intelligence-10)/2)})</p>
                </div>  
                <div className="ability-wisdom">
                    <h4>WIS</h4>
                    <p>{monster.wisdom} ({Math.floor((monster.wisdom-10)/2) >= 0 ? `+${Math.floor((monster.wisdom-10)/2)}` : Math.floor((monster.wisdom-10)/2)})</p>
                </div>  
                <div className="ability-charisma">
                    <h4>CHA</h4>
                    <p>{monster.charisma} ({Math.floor((monster.charisma-10)/2) >= 0 ? `+${Math.floor((monster.charisma-10)/2)}` : Math.floor((monster.charisma-10)/2)})</p>
                </div>  
            </div> 
<svg height="5" width="100%" className="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
    </svg>
                
            <h6 />
     
            {(monster.strength_save || monster.dexterity_save || monster.constitution_save ||
             monster.intelligence_save || monster.wisdom_save || monster.charisma_save) && (
            <div className="property-line">
                <h4>Saving Throws </h4>
                <p>
                {monster.strength_save ? `Str +${monster.strength_save}  ` : ''}
                {monster.dexterity_save ? `Dex +${monster.dexterity_save}  ` : ''}
                {monster.constitution_save ? `Con +${monster.constitution_save}  ` : ''}
                {monster.intelligence_save ? `Int +${monster.intelligence_save}  ` : ''}
                {monster.wisdom_save ? `Wis +${monster.wisdom_save}  ` : ''}
                {monster.charisma_save ? `Cha +${monster.charisma_save}  ` : ''}
                </p>
            </div> 
            )}

            {monster.skills !== 0 && monster.skills  && 
            <div className="property-line">
                <h4>Skills </h4>
            {isNaN(params.id) && (
                Object.entries(monster.skills).map((array)=>(
                        <p key={array[0]}>{array[0]} +{array[1]}  </p>
                ))
            )}

            {!isNaN(params.id) && monster.skills &&(
                monster.skills.map((array) => (
                <p key={array.id}>{array.name} +{array.modifier}  </p>
                ))
            )}
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
        
        {monster.special_abilities && monster.special_abilities && (
        <div>
        {monster.special_abilities.map((array) => (
            <div key={array.name+'specialTopDiv'} className="property-block">
            <h4 key={array.name+'specialTop'}>{array.name} {array.usage ? '(' + array.usage.times+'/Day)' : ''}. </h4>
            <p key={array.name+'special'}>{array.desc} </p>
            </div> 
        ))}
        </div> 
        )}

        {monster.legendary_actions && monster.legendary_actions && monster.legendary_actions.length !== 0 &&
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
            {monster.actions && monster.actions && (
            <div>
            {monster.actions.map((array) => (
            <div key={array.name+'specialTopDiv'} className="property-block">
            <h4 key={array.name+'specialTop'}>{array.name}. </h4>
            <p key={array.name+'special'}>{array.desc} </p>
            </div> 
            )) }
            </div>)}
        </div>

    <div>  
    <hr className="orange-border bottom" />
    <br />
    </div>
    </div>  
</div>
</div>
</div>
</div>
    )}