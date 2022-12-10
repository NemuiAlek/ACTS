import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Link, Route, Routes } from "react-router-dom";

import Index from "./components/index"
import MonsterStandard from "./components/monster/monsterStandard"
import MonsterCustom from "./components/monster/monsterCustom"
import Nav from "./components/Nav"
import CombatTracker from "./components/combatTracker"
import About from "./components/about"
import SignUp from "./components/auth/signUp"
import LogIn from "./components/auth/logIn"
import { UserProvider } from "./contexts/UserContext";


function App() {

  return (
    <div className="main">
    <UserProvider>

    <Nav />

        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/Monster/standard" element={<MonsterStandard />} />
          <Route path="/Monster/custom" element={<MonsterCustom />} />

          <Route path="/CombatTracker" element={<CombatTracker />} />

          <Route path="/About" element={<About />} />

          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/LogIn" element={<LogIn />}/>
          
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
