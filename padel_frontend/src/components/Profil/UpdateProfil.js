import React from 'react';
import { useSelector } from 'react-redux';
import UploadImg from './UploadImg';

const UpdateProfil = () => {

  const userData = useSelector((state)=>state.userReducer);

  return (
    <div>
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt='profile'/>
          <UploadImg/>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;