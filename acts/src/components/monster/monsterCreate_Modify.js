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
    monsterName:'',
    Title:'',
    ArmorClass:10,
    HitPoints:10,
    HitPointsRolled:'1d20+1',
    GroundSpeed:30,
    FlightSpeed:null,
    swimSpeed:null,
    burrowSpeed:null,
    Strength:10,
    Dexterity:10,
    Constitution:10,
    Inteligence:10,
    Wisdom:10,
    Charisma:10,
    LegendaryRes:0,
    LegendaryAct:0,
    ChallengeRating:0,
    ExperiencePoints:1000,
    AdditionalNotes:'',
    MonsterDescription:'',
    Image:'',
    URL:'',
})
const [newID, setForm] = useState(false)


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

    const monName = monster.monsterName.replace(/'/g,"''");
    const monTitle = monster.Title.replace(/'/g,"''");
    const monmon = monster.Title.replace(/'/g,"''")

    axios
    .post("http://localhost:4000/monsters/create-update/" + params.id, 
    {
        monsterName: monster.monsterName.replace(/'/g,"''"),
        Title: monster.Title.replace(/'/g,"''"),
        ArmorClass: monster.ArmorClass,
        HitPoints: monster.HitPoints,
        HitPointsRolled: monster.HitPointsRolled,
        GroundSpeed: monster.GroundSpeed,
        FlightSpeed: monster.FlightSpeed,
        swimSpeed: monster.swimSpeed,
        burrowSpeed: monster.burrowSpeed,
        Strength: monster.Strength,
        Dexterity: monster.Dexterity,
        Constitution: monster.Constitution,
        Inteligence: monster.Inteligence,
        Wisdom: monster.Wisdom,
        Charisma: monster.Charisma,
        LegendaryRes: monster.LegendaryRes,
        LegendaryAct: monster.LegendaryAct,
        ChallengeRating: monster.ChallengeRating,
        ExperiencePoints: monster.ExperiencePoints,
        AdditionalNotes: monster.AdditionalNotes.replace(/'/g,"''"),
        MonsterDescription: monster.MonsterDescription.replace(/'/g,"''"),
        Image: monster.Image,
        URL: monster.URL,
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

        // {Object.entries(monster).map((array) => (
        //     <input 
        //     type="text"
        //     value={array[1]}
        //     onChange={(e) => {
        //     updateInput(e, `${array[0]}`);
        //     }} />
        // ))}

        <div className="monsterPage">

        <div className="mainAttributes">
        {newID && (
        <div>
            <h4>New Monster</h4>
        </div>
        )}
        
        {!newID && (
        <div>
            <h4>Update Monster</h4>
        </div>
        )}
            <label>Name</label>
            <input 
                type="text"
                defaultValue={monster.monsterName}
		        onChange={(e) => {
		        updateInput(e, "monsterName");
		        }} /> 
            <br />

            <label>Title</label>
            <input 
                type="text"
                defaultValue={monster.Title}
		        onChange={(e) => {
		        updateInput(e, "Title");
		        }} />
            <br />

            <h4>Stats</h4>
            <label>Armor Class</label>
            <input 
                type="number"
                defaultValue={monster.ArmorClass}
		        onChange={(e) => {
		        updateInput(e, "ArmorClass");
		        }} /> 
            <br />
            
            <label>Hit Points</label>
            <input 
                type="number"
                defaultValue={monster.HitPoints}
		        onChange={(e) => {
		        updateInput(e, "HitPoints");
		        }} /> 
            <br />

            <label>Hit Points (rolled)</label>
            <input 
                type="text"
                defaultValue={monster.HitPointsRolled}
		        onChange={(e) => {
		        updateInput(e, "HitPointsRolled");
		        }} /> 
            <br />
            
            <div className="speed">
                <h5>Speed</h5>
                <label>Ground</label>
                <input 
                    type="number"
                    defaultValue={monster.GroundSpeed || ''}
                    onChange={(e) => {
                    updateInput(e, "GroundSpeed");
                    }} />
                <br />

                <label>Flight</label>
                <input 
                    type="number"
                    defaultValue={monster.FlightSpeed || ''}
                    onChange={(e) => {
                    updateInput(e, "FlightSpeed");
                    }} /> 
                <br />
                
                <label>Swim</label>
                <input 
                    type="number"
                    defaultValue={monster.swimSpeed || ''}
                    onChange={(e) => {
                    updateInput(e, "swimSpeed");
                    }} /> 
                <br />

                <label>Burrow</label>
                <input 
                    type="number"
                    defaultValue={monster.burrowSpeed || ''}
                    onChange={(e) => {
                    updateInput(e, "burrowSpeed");
                    }} /> 
                <br />
            </div>
            
            <div className="attributes">
                <h5>Attribuites</h5>
                <label>Strength</label>
                <input 
                    type="number"
                    defaultValue={monster.Strength}
                    onChange={(e) => {
                    updateInput(e, "Strength");
                    }} />
                <br />

                <label>Dexterity</label>
                <input 
                    type="number"
                    defaultValue={monster.Dexterity}
                    onChange={(e) => {
                    updateInput(e, "Dexterity");
                    }} /> 
                <br />
                
                <label>Constitution</label>
                <input 
                    type="number"
                    defaultValue={monster.Constitution}
                    onChange={(e) => {
                    updateInput(e, "Constitution");
                    }} /> 
                <br />

                <label>Inteligence</label>
                <input 
                    type="number"
                    defaultValue={monster.Inteligence}
                    onChange={(e) => {
                    updateInput(e, "Inteligence");
                    }} /> 
                <br />

                <label>Wisdom</label>
                <input 
                    type="number"
                    defaultValue={monster.Wisdom}
                    onChange={(e) => {
                    updateInput(e, "Wisdom");
                    }} />
                <br />

                <label>Charisma</label>
                <input 
                    type="number"
                    defaultValue={monster.Charisma}
                    onChange={(e) => {
                    updateInput(e, "Charisma");
                    }} /> 
                <br />
            </div>
        
            <div className="legendary">
                <h5>Legendary Rules</h5>
                <label>Legendary Resitances per Day</label>
                <input 
                    type="number"
                    defaultValue={monster.LegendaryRes}
                    onChange={(e) => {
                    updateInput(e, "LegendaryRes");
                    }} /> 
                <br />

                <label>Legendary Actions per Turn</label>
                <input 
                    type="number"
                    defaultValue={monster.LegendaryAct}
                    onChange={(e) => {
                    updateInput(e, "LegendaryAct");
                    }} /> 
                <br />
            </div>
            
            <div className="info">
                <h5>Monster Info</h5>
                <label>Challenge Rating</label>
                <input 
                    type="number"
                    defaultValue={monster.ChallengeRating}
                    onChange={(e) => {
                    updateInput(e, "ChallengeRating");
                    }} />
                <br />
                
                <label>Experience Points</label>
                <input 
                    type="number"
                    defaultValue={monster.ExperiencePoints}
                    onChange={(e) => {
                    updateInput(e, "ExperiencePoints");
                    }} /> 
                <br />
                
                <label>AdditionalNotes</label>
                <input 
                    type="MonsterDescription"
                    defaultValue={monster.MonsterDescription}
                    onChange={(e) => {
                    updateInput(e, "MonsterDescription");
                    }} /> 
                <br />

                <label>Image</label>
                <input 
                    disabled
                    type="text"
                    defaultValue={monster.Image}
                    onChange={(e) => {
                    updateInput(e, "Image");
                    }} /> 
                <br />

                <label>URL</label>
                <input 
                    type="text"
                    defaultValue={monster.URL}
                    onChange={(e) => {
                    updateInput(e, "URL");
                    }} />
                <br />
            </div>
        </div>


        {newID && (
        <div>
            <button className="profileEditOptions" onClick={submitBtn}>Create</button>
        </div>
        )}
        
        {!newID && (
        <div>
            <button className="profileEditOptions" onClick={submitBtn}>Update</button>
            <button className="profileEditOptions" onClick={deleteMonster}>Delete Monster</button>
        </div>
        )}



        </div>
    )
}