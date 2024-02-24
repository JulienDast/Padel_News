import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const uid = useContext(UidContext);
  const userData = useSelector((state)=>state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <h4>Logo</h4>
            <h3>Padel News</h3>
          </NavLink>
          <NavLink exact to="/profil">
            <h4>Logo profil</h4>
          </NavLink>
          <NavLink exact to="/article">
            <h4>Logo articles</h4>
          </NavLink>
        </div>
        {uid?(
          <ul>
            <li>
              <div className="welcome">
                <NavLink exact to='/profil'>
                  <h5>Bienvenue {userData.pseudo}</h5>
                </NavLink>
              </div>
            </li>
            <Logout/>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink exact to='/profil'>
                Logo se connecter
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;