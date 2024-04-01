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
        <Link to={`/articles/${post._id}`}>
          <div>
            {isLoading ? (
              <i className='fas fa-spinner fa-spin'></i>
            ) : (
              <> 
                <img src={post.picture} alt='pic-article' onError={(e)=>{e.target.src = './uploads/posts/random-article.jpg'}}/>
              </>
            )}
          </div>
          <div>

            <span>{dateParser(post.createdAt)}</span>
          </div>
          <div>
            <h4>{post.title}</h4>
            <p>{post.subtitle}</p>
          </div>
        </Link>
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
