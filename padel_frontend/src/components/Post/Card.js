import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';

const Card = ({post}) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(()=>{
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <div>
      <li key={post._id}>
        {/* Wrappez les éléments suivants avec Link */}
        <Link to={`/articles/${post._id}`}>
          <div>
            {isLoading ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              <>
                {/* <img src={
                  !isEmpty(usersData[0]) && usersData.map((user) => {
                  if (user._id === post.posterId) return user.picture;
                  }).join('')
                } alt='poster-pic'/> */}
                <img src={post.picture} alt='pic-article'/>
              </>
            )}
          </div>
          <div>
            {/* <h3>
              {
              !isEmpty(usersData[0]) && usersData.map((user) => {
                if (user._id === post.posterId) return user.pseudo;
                }).join('')
              }
            </h3> */}
            <span>{dateParser(post.createdAt)}</span>
          </div>
          <div>
            <h4>{post.title}</h4>
            <p>{post.subtitle}</p>
          </div>
        </Link>
        {/* Boutons en dehors de Link */}
        <div>
          <p><i className="fa-regular fa-comment"/>{post.comments.length}</p>
          <p><LikeButton post={post}/></p>
          <i className ="fa-solid fa-share-nodes"></i>
        </div>
      </li>
    </div>
  );
};

export default Card;
