import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';


const DeleteArticle = (props) => {
  const dispatch = useDispatch();

  const deleteArticle = async () => {
    await dispatch(deletePost(props.id));
  };

  const handleClick = async () => {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      await deleteArticle();
      window.alert("Vous avez bien supprimé l'article !");
      window.location.href= '/articles';
    }
  };

  return (
    <div onClick={handleClick}>
      <i className={"fa-solid fa-trash"} style={{"color": '#ff0000'}}>Supprimer l'article</i>
    </div>
  );
};


export default DeleteArticle;