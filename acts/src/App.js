import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link, Route, Routes } from "react-router-dom";

//Home Page and Nav Bar
import Index from "./components/index"
import Nav from "./components/Nav"

// Monster Routes
import MonsterStandard from "./components/monster/monsterStandard"
import MonsterCustom from "./components/monster/monsterCustom"
import MonsterStandardDetail from "./components/monster/monsterStandardDetail"
import MonsterCustomDetail from "./components/monster/monsterCustomDetail"
import MonsterCreate_Modify from "./components/monster/monsterCreate_Modify"

// Combat Routes
import CombatTracker from "./components/combat/combatTracker"

// About Screen
import About from "./components/about"

// User Routes
import SignUp from "./components/auth/signUp"
import LogIn from "./components/auth/logIn"
import Profile from "./components/auth/profile"
import { UserProvider } from "./contexts/UserContext";


function App() {

  return (
    <div className="main">
    <UserProvider>

    <Nav />

        <Routes>
        {/* Home Page */}
          <Route path="/" element={<Index />} />

        {/* Monster Routes */}
          <Route path="/Monster/standard" element={<MonsterStandard />} />
          <Route path="/Monster/custom" element={<MonsterCustom />} />
          <Route path="/Monster/standard/:id" element={<MonsterStandardDetail />} />
          <Route path="/Monster/custom/:id" element={<MonsterCustomDetail />} />
          <Route path="/Monster/create-modify/:id" element={<MonsterCreate_Modify />} />


        {/* Combat Routes */}
          <Route path="/CombatTracker" element={<CombatTracker />} />

        {/* About Screen */}
          <Route path="/About" element={<About />} />
        
        {/* User routes */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />}/>
          <Route path="/Profile/:id" element={<Profile />}/>
          
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
