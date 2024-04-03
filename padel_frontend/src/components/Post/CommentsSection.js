import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { timestampParser } from '../Utils';
import { addComment, getPosts } from '../../actions/post.actions';
import EditDeleteComment from './EditDeleteComment';

const CommentsSection = (props) => {
  
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);
  const usersData = useSelector(state => state.usersReducer);
  const { comments, id } = props; 

  const handleComment = (e) => {
    e.preventDefault();
    if(text){
      dispatch(addComment(id, userData._id, text, userData.pseudo))
      .then(()=>dispatch(getPosts()))
      .then(()=>setText(''));
    }
  }

  return (
    <div className='comments'>
      <h1>Commentaires</h1>
      {comments.map((comment) => {
        const commenter = usersData.find(user => user._id === comment.commenterId);

        return (
          <div key={comment._id} className={comment.commenterId === userData._id ? "own-comment" : "other-comment"}>
            <img 
              src={commenter ? commenter.picture.substring(1) : null}
              alt="commenter-pic" 
            />
            <p style={{ color: comment.commenterId === userData._id ? "blue" : "red" }}>
              {comment.commenterPseudo} {comment.text} {timestampParser(comment.timestamp)}
            </p>
            <EditDeleteComment id={id} comment={comment}/>
          </div>
        );
      })}
      {userData._id && (
        <form action='' onSubmit={handleComment} className='comment-form'>
          <input type='text' name='text' onChange={(e)=> setText(e.target.value)} value={text} placeholder='À vous de servir !'/>
          <br/>
          <input type='submit' value="Envoyer"/>
        </form>
      )}
    </div>
  );
};

export default CommentsSection;
