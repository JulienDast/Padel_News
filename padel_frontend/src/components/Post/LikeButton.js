import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';



const LikeButton = ( {post} ) => {

  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(post.likers.includes(uid)){
      setLiked(true);
    }
    else{
      setLiked(false);
    }
  }, [uid, post.likers, liked]);

  const like = () =>{
    dispatch(likePost(post._id, uid));
    setLiked(true);
  }

  const unlike = () =>{
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  }

  return (
    <div>
      {uid === null && (
        <p>
          <Popup trigger={<i className ="fa-regular fa-heart" alt='like'/>}
          position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick>
          <div><p>Vous devez être connecté(e) !</p></div>
          </Popup>
          {post.likers.length}
        </p>
      )}
      {uid && (
        <p>
          <i
            className={liked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            style={{ color: liked ? '#FFD43B' : '' }}
            alt={liked ? 'unlike' : 'like'}
            onClick={liked ? unlike : like}
          />
        {post.likers.length}
        </p>
      )}
    </div>
  );
};

export default LikeButton;