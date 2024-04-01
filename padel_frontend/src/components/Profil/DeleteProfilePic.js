import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePicProfil } from '../../actions/user.actions';


const DeleteProfilePic = (props) => {
  const dispatch = useDispatch();

  const deletePhoto = async () => {
    await dispatch(deletePicProfil(props.id));
  };

  const handleClick = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cette photo ?')) {
      await deletePhoto();
      window.location.href=`/profil`;
      window.alert("Vous avez bien supprimé la photo !");
    }
  };

  return (
    <div onClick={handleClick}>
      <i className={"fa-solid fa-trash"} style={{"color": '#ff0000'}}>Supprimer l'image</i>
    </div>
  );
};

export default DeleteProfilePic;