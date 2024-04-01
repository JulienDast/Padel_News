import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideoArticle } from '../../actions/post.actions';

const DeleteVideo = ({ id, setIsVideoUpdated }) => { 
  const dispatch = useDispatch();

  const deleteVideo = async () => {
    await dispatch(deleteVideoArticle(id));
    setIsVideoUpdated(true); // Mettre à jour isVideoUpdated après la suppression de la vidéo
  };

  const handleClick = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cette vidéo ?')) {
      await deleteVideo();
      setIsVideoUpdated(true); 
      window.location.href=`/articles/${id}`;
      window.alert("Vous avez bien supprimé la vidéo !");
    }
  };

  return (
    <div onClick={handleClick}>
      <i className={"fa-solid fa-trash"} style={{"color": '#ff0000'}}>Supprimer la video</i>
    </div>
  );
};

export default DeleteVideo;