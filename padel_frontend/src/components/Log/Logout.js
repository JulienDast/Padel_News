import axios from 'axios';
import React from 'react';
import cookie from 'js-cookie';

const Logout = () => {

  const removeCookie = (key) =>{
    if(window !== "undefined"){
      cookie.remove(key, {expires: 1});
    }
  }

  const logout = async()=>{
    await axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
    .then(()=> removeCookie('jwt'))
    .catch((err)=>console.log(err));

    window.location = "/";
  }

  return (
    <div>
      <li onClick={logout}>
        <p>Btn Logout</p>
      </li>
    </div>
  );
};

export default Logout;