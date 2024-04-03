import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';

const EditDeleteComment = (props) => {

  const {comment, id} = props;
  const [isAuthor, setIsAuthor]= useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(false);
  const uid = useContext(UidContext); 
  const userData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) =>{
    e.preventDefault();
    if(text){
      dispatch(editComment(id, comment._id, text));
      setText('');
      setEdit(false);
    }
  };

  const handleDelete = ()=>{
    dispatch(deleteComment(id, comment._id));
  }

  useEffect(()=>{
    const checkAuthor = ()=>{
      if(uid === comment.commenterId){
        setIsAuthor(true);
      }
    }
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div>
      <div className="delete-comment">
      {(isAuthor || (userData.isAdmin === true)) && edit === false && (
          <span onClick={() =>{
            if(window.confirm("Voulez-vous supprimer ce commentaire ?")
            ){
              handleDelete();
            }
          }}>
            <i className={"fa-solid fa-trash"} style={{"color": '#ff0000'}}></i>
          </span>
        )}
      </div>
      <div className="edit-comment">
        {(isAuthor || (userData.isAdmin === true)) && edit === false && (
          <span onClick={() => setEdit(!edit)}>
            <i className="fa-solid fa-pencil"></i>
          </span>
        )}
        {(isAuthor || (userData.isAdmin === true)) && edit && (
          <form action='' onSubmit={handleEdit} className='edit-comment-form'>
            <label htmlFor='text' onClick={()=> setEdit(!edit)}></label>
            <br/>
            <input type='text' name='text' onChange={(e)=> setText(e.target.value)} defaultValue={comment.text}></input>
            <br/>
            <input type='submit' value="Valider les modifications"></input>
          </form>  
        )}
      </div>
    </div>
  );
};

export default EditDeleteComment;