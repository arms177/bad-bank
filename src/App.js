import { UserContext } from './components/context';
import React from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar';
import Home from './components/home';
import CreateAccount from './components/createaccount';
import Login from './components/login';
import Deposit from './components/deposit';
import Withdraw from './components/withdraw';
import AllData from './components/alldata';
import {useContext} from "react";

function App() {
  const ctx = useContext(UserContext);

  const toggleLogin = () => {
    setBankUser((prevLogin) => ({
      isLoggedIn: prevLogin.isLoggedIn === ctx.isLoggedIn ? false : true,
      user: ctx.user ? ctx.user : {}
    }))
  }

  const [bankUser, setBankUser] = React.useState({
    isLoggedIn: false,
    user: {}
  })

  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider value={ctx}>
        <div className="container" style={{padding: "20px"}}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/createaccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login change={toggleLogin} />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

export default App;
