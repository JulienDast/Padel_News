import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio, updatePseudo } from '../../actions/user.actions';
import { dateParser } from '../Utils';

const UpdateProfil = () => {
  const [bio, setBio] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [updateForm, setUpdateForm] = useState(false);
  const [updatePseudoForm, setUpdatePseudoForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  }

  const handleUpdatePseudo = () => {
    if (pseudo.length >= 3 && pseudo.length <= 1000) {
      dispatch(updatePseudo(userData._id, pseudo));
      setUpdatePseudoForm(false);
    } else {
      alert('Le pseudo doit avoir entre 3 et 1000 caractères.');
    }
  }

  return (
    <div>
      {updatePseudoForm === false && (
        <>
          <h1 onClick={() => setUpdatePseudoForm(!updatePseudoForm)}>Profil de {userData.pseudo}</h1>
          <button onClick={() => setUpdatePseudoForm(!updatePseudoForm)}>Modifier le pseudo</button>
        </>
      )}
      {updatePseudoForm && (
        <>
          <textarea id='pseudoInput' type="text" defaultValue={userData.pseudo} value={pseudo} onChange={(e) => setPseudo(e.target.value)}></textarea>
          <button onClick={handleUpdatePseudo}>Valider les modifications</button>
        </>
      )}
      <div className="update-container">
        <div className="left">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt='profile' />
          <UploadImg />
        </div>
        <div className="right">
          <div className="bio-update">
            <h3>Statut</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>Modifier le statut</button>
              </>
            )}
            {updateForm && (
              <>
                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <button onClick={handleUpdate}>Valider les modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
