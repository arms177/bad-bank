import React from 'react';
import { useNavigate } from "react-router-dom";
import {Container , Dropdown} from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './context';

function NavBar(){
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    ctx.isLoggedIn = false;
    ctx.user = {};
    setTimeout(() => navigate("/"), 1000);
  }

  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light menu">
      <a className="navbar-brand" href="#/">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          { !ctx.isLoggedIn && <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li> }
          { !ctx.isLoggedIn && <li className="nav-item">
            <a id="login-anchor" className="nav-link" href="#/login/">Login</a>
          </li> }
          { ctx.isLoggedIn && <>
            <Container className='p-1'>
              <Dropdown>
                <Dropdown.Toggle variant=" primary" id="dropdown-basic">
                  {ctx.user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </>
          }
          { ctx.isLoggedIn && <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li> }
          { ctx.isLoggedIn && <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li> }
          { ctx.isLoggedIn && <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li> }
        </ul>
      </div>
    </nav>
    </>
  );
}

export default NavBar;
