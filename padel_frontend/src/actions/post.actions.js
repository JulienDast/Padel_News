import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_TITLE = "UPDATE_TITLE";
export const UPDATE_SUBTITLE = "UPDATE_SUBTITLE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_VIDEO = "UPDATE_VIDEO";
export const UPDATE_PICTURE = "UPDATE_PICTURE";
export const DELETE_PICTURE = "DELETE_PICTURE";
export const DELETE_VIDEO = "DELETE_VIDEO";

export const getPosts = (num)=>{
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res)=>{
        const array = res.data.slice(0, num)
        dispatch({type: GET_POSTS, payload: array})
      })
      .catch((err)=> console.log(err));
  };
};

export const likePost = (postId, userId) => {
  return(dispatch) =>{
    return axios ({
      method : 'patch',
      url : `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data : { id: userId}
    })
    .then((res)=>{
      dispatch({type: LIKE_POST, payload: {postId, userId}})
    })
    .catch((err)=> console.log(err));
  }
}

export const unlikePost = (postId, userId) => {
  return(dispatch) =>{
    return axios ({
      method : 'patch',
      url : `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + postId,
      data : { id: userId}
    })
    .then((res)=>{
      dispatch({type: UNLIKE_POST, payload: {postId, userId}})
    })
    .catch((err)=> console.log(err));
  }
}

export const updatePicture = (postId, file) => {
  return (dispatch) => {
    const formData = new FormData();
    formData.append('file', file); 
    
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data' 
      }
    })
    .then((res) => {
      dispatch({ type: UPDATE_PICTURE, payload: { postId, file } });
    })
    .catch((err) => console.log(err));
  };
};

export const updateTitle = (postId, title)=>{
  return(dispatch)=>{
    return axios({
      method: 'put',
      url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {title}
    })
    .then((res)=>{
      dispatch({type: UPDATE_TITLE, payload: {title, postId}});
    })
    .catch((err)=>console.log(err));
  };
};

export const updateSubtitle = (postId, subtitle)=>{
  return(dispatch)=>{
    return axios({
      method: 'put',
      url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {subtitle}
    })
    .then((res)=>{
      dispatch({type: UPDATE_SUBTITLE, payload: {subtitle, postId}});
    })
    .catch((err)=>console.log(err));
  };
};

export const updateArticle = (postId, article)=>{
  return(dispatch)=>{
    return axios({
      method: 'put',
      url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {article}
    })
    .then((res)=>{
      dispatch({type: UPDATE_ARTICLE, payload: {article, postId}});
    })
    .catch((err)=>console.log(err));
  };
};

export const updateVideo = (postId, video)=>{
  return(dispatch)=>{
    return axios({
      method: 'put',
      url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: {video}
    })
    .then((res)=>{
      dispatch({type: UPDATE_VIDEO, payload: {video, postId}});
    })
    .catch((err)=>console.log(err));
  };
};

export const deletePost = (postId) =>{
  return(dispatch)=>{
    return axios({
      method: 'delete',
      url : `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
    .then((res)=>{
      dispatch({type: DELETE_POST, payload: {postId}});
    })
    .catch((err)=>console.log(err));
  };
}

export const deletePictureArticle = (postId)=>{
  return(dispatch)=>{
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-photo/${postId}`
    })
    .then((res)=>{
      dispatch({type: DELETE_PICTURE, payload: {postId}});
    })
    .catch((err)=>console.log(err));
  }
}

export const deleteVideoArticle = (postId)=>{
  return(dispatch)=>{
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/delete-video/${postId}`
    })
    .then((res)=>{
      dispatch({type: DELETE_VIDEO, payload: {postId}});
    })
    .catch((err)=>console.log(err));
  }
}
