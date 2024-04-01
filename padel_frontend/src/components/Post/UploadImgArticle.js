import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePicture } from '../../actions/post.actions';
import { useParams } from 'react-router-dom';

const UploadImgArticle = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector(state=>state.userReducer)

  const handlePicture = (e) => {
    if (file) {
      dispatch(updatePicture(id, file));
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }

  return (
    <div>
      {userData.isAdmin === true && (
      <form onSubmit={handlePicture} className='upload-pic-post'>
        <label htmlFor='file'>Changer la photo de l'article</label>
        <input type='file' id='file' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => setFile(e.target.files[0])} />
        <br />
        {file !== null && file.name && <p>Fichier sélectionné : {file.name}</p>}
        {file !== null && <input type="submit" value="Envoyer" />} 
      </form>
      )}
    </div>
  );
};

export default UploadImgArticle;