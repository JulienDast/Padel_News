import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts } from '../actions/post.actions';
import { dateParser } from '../components/Utils';
import LikeButton from '../components/Post/LikeButton';

const Article = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer); 
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      const foundPost = posts.find(post => post._id === id);
      setSelectedPost(foundPost);
      setLoading(false);
    }
  }, [id, posts]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!selectedPost) {
   return window.location.href= '/articles';
  }

  return (
    <div>
      <h2>Article Details</h2>
      <p>Title: {selectedPost.title}</p>
      <p>Subtitle: {selectedPost.subtitle}</p>
      <p>Comments: {selectedPost.comments.length}</p>
      <p>{selectedPost.article}</p>

      <p>Post Date: {dateParser(selectedPost.createdAt)}</p>
      <LikeButton post={selectedPost}/> 
    </div>
  );
};

export default Article;
