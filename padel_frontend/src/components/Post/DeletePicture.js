import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePictureArticle } from '../../actions/post.actions';


const DeletePicture = (props) => {
  const dispatch = useDispatch();

  const deletePhoto = async () => {
    await dispatch(deletePictureArticle(props.id));
  };

  const handleClick = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cette photo ?')) {
      await deletePhoto();
      window.location.href=`/articles/${props.id}`;
      window.alert("Vous avez bien supprimé la photo !");
    }
  };

  return (
    <div onClick={handleClick}>
      <i className={"fa-solid fa-trash"} style={{"color": '#ff0000'}}>Supprimer l'image</i>
    </div>
  );
};


export default DeletePicture;