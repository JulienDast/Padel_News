import React, {useContext} from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/Routes/AppContext';

const Profil = () => {

  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <h1>Page Update à venir</h1>
      ):(
      <div className="log-container">
        <Log/>
      </div>
    )}
    </div>
  );
};

export default Profil;