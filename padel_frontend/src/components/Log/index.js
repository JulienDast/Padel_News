import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = () => {

  const [signUpModal, setSignUpModal]= useState(false);
  const [signInModal, setSignInModal]= useState(true);

  const handleModals = (e) =>{
    if (e.target.id === "register"){
      setSignUpModal(true);
      setSignInModal(false);
    } else if (e.target.id ==="login"){
      setSignUpModal(false);
      setSignInModal(true);
    }
  }

  return (
    <div>
      <div className="connection-form">
        <div className="form-container">
          <ul>
            <li id="register" className={signUpModal? "active-btn" : null} onClick={handleModals}>S'inscrire</li>
            <li id="login" className={signInModal? "active-btn" : null} onClick={handleModals}>Se connecter</li>
          </ul>
          {signInModal && <SignInForm/>}
          {signUpModal && <SignUpForm/>}
        </div>
      </div>
    </div>
  );
};

export default Log;