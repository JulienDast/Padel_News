import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPosts, updateArticle, updateSubtitle, updateTitle, updateVideo } from '../actions/post.actions';
import { dateParser } from '../components/Utils';
import LikeButton from '../components/Post/LikeButton';
import YouTube from 'react-youtube';
import DeleteArticle from '../components/Post/DeleteArticle';
import UploadImgArticle from '../components/Post/UploadImgArticle';
import DeletePicture from '../components/Post/DeletePicture';
import DeleteVideo from '../components/Post/DeleteVideo';
import CommentsSection from '../components/Post/CommentsSection';

const Article = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer); 
  const userData = useSelector(state => state.userReducer);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState(null);
  const [isSubtitleUpdated, setIsSubtitleUpdated] = useState(false);
  const [subtitleUpdate, setSubtitleUpdate] = useState(null);
  const [isArticleUpdated, setIsArticleUpdated] = useState(false);
  const [articleUpdate, setArticleUpdate] = useState(null);
  const [isVideoUpdated, setIsVideoUpdated] = useState(false);
  const [videoUpdate, setVideoUpdate] = useState(null);
  

  const updateTitlePost =  ()=>{
    if(titleUpdate){
      dispatch(updateTitle(id, titleUpdate))
    }
    setIsTitleUpdated(false);
  }

  const updateSubtitlePost =  ()=>{
    if(subtitleUpdate){
      dispatch(updateSubtitle(id, subtitleUpdate))
    }
    setIsSubtitleUpdated(false);
  }

  const updateArticlePost =  ()=>{
    if(articleUpdate){
      dispatch(updateArticle(id, articleUpdate))
    }
    setIsArticleUpdated(false);
  }
  const updateVideoPost =  ()=>{
    if(videoUpdate){
      dispatch(updateVideo(id, videoUpdate))
    }
    setIsVideoUpdated(false);
    window.location.reload();
  }

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

  useEffect(() => {
    if (!selectedPost) {
      const redirectTimer = setTimeout(() => {
        window.location.href = '/articles';
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [selectedPost]);

  if (loading || !selectedPost) {
    return <div>Chargement...</div>;
  }


  return (
    <div>
      <h2>Article Details</h2>

      {isTitleUpdated === false && <p>Title: {selectedPost.title}</p>}
      {userData.isAdmin === true && (
      <div className="button-update-title">
        <div onClick={()=> setIsTitleUpdated(!isTitleUpdated)}>
        <i className="fa-solid fa-pencil">Modifier le titre</i>
        </div>
      </div>
      )}
      {isTitleUpdated && (
        <div className="update-title">
          <textarea defaultValue={selectedPost.title} onChange={(e)=> setTitleUpdate(e.target.value)}/>
          <button onClick={updateTitlePost}>Valider modifications</button>
        </div>
      )}


      {isSubtitleUpdated === false && <p>Subtitle: {selectedPost.subtitle}</p>}
      {userData.isAdmin === true && (
      <div className="button-update-subtitle">
        <div onClick={()=> setIsSubtitleUpdated(!isSubtitleUpdated)}>
        <i className="fa-solid fa-pencil">Modifier le sous-titre</i>
        </div>
      </div>
      )}
      {isSubtitleUpdated && (
        <div className="update-subtitle">
          <textarea defaultValue={selectedPost.subtitle} onChange={(e)=> setSubtitleUpdate(e.target.value)}/>
          <button onClick={updateSubtitlePost}>Valider modifications</button>
        </div>
      )}
      
      <div>
        
        <img src={selectedPost.picture.substring(1)} alt='pic-article' onError={(e)=>{e.target.src = '/uploads/posts/random-article.jpg'}}/>
        <UploadImgArticle />
        {userData.isAdmin && selectedPost.picture !== './uploads/posts/random-article.jpg' &&
        <DeletePicture id={id}/>
        }
      </div>
      
      {isArticleUpdated === false && <p>Article: {selectedPost.article}</p>}
      {userData.isAdmin === true && (
      <div className="button-update-article">
        <div onClick={()=> setIsArticleUpdated(!isArticleUpdated)}>
        <i className="fa-solid fa-pencil">Modifier l'article</i>
        </div>
      </div>
      )}
      {isArticleUpdated && (
        <div className="update-article">
          <textarea defaultValue={selectedPost.article} onChange={(e)=> setArticleUpdate(e.target.value)}/>
          <button onClick={updateArticlePost}>Valider modifications</button>
        </div>
      )}

      {isVideoUpdated === false && selectedPost.video && (
        <div>
          {(() => {
            function getYoutubeVideoId(url) {
              const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
              const match = url.match(youtubeRegex);
              return match ? match[1] : null;
            }
            const videoId = getYoutubeVideoId(selectedPost.video);
            
            return (
              <div>
                <YouTube videoId={videoId} opts={{ width: '500', height: '300'}}/>
                {userData.isAdmin === true && (
                <div className="button-update-article">
                  <div onClick={()=> setIsVideoUpdated(!isVideoUpdated)}>
                    <i className="fa-solid fa-pencil">Modifier la video</i>
                  </div>
                </div>
                )}
                <DeleteVideo id={id} setIsVideoUpdated={setIsVideoUpdated} />
              </div>
            );
          })()}
        </div>
      )}
      {selectedPost.video === "" &&(
        <div className="button-update-article">
          <div onClick={()=> setIsVideoUpdated(!isVideoUpdated)}>
            <i className="fa-solid fa-pencil">Ajouter une video</i>
          </div>
        </div>
      )}
      {isVideoUpdated && (
        <div className="update-video">
          <textarea defaultValue={selectedPost.video} onChange={(e)=> setVideoUpdate(e.target.value)}/>
          <button onClick={updateVideoPost}>Valider modifications</button>
        </div>
      )}

      <LikeButton post={selectedPost}/> 
      {userData.isAdmin === true && (
        <DeleteArticle id={id}/>
      )}
      <p>Post Date: {dateParser(selectedPost.createdAt)}</p>
      <CommentsSection id={id} posterId={selectedPost.posterId} comments={selectedPost.comments}/>

    </div>
  );
};

export default Article;

