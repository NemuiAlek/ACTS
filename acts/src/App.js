import './App.css';
import { Link, Route, Routes } from "react-router-dom";

import Index from "./components/index"
import MonsterDirectory from "./components/monsterDirectory"
import CombatTracker from "./components/combatTracker"
import About from "./components/about"
import SignUp from "./components/auth/logIn"
import LogIn from "./components/auth/signUp"

function App() {
  return (
    <div className="main">
        <Routes>
          <Route
            path="/"
            element={<Index />}
          />

          <Route
            path="/MonsterDirectory"
            element={<MonsterDirectory />}
          />

          <Route
            path="/CombatTracker"
            element={<CombatTracker />}
          />

          <Route
            path="/About"
            element={<About />}
          />

          <Route
            path="/SignUp"
            element={<SignUp />}
          />

          <Route
            path="/LogIn"
            element={<LogIn />}
          />
          
        </Routes>
    </div>
  );
}

export default App;
