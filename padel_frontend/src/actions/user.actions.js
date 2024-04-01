import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const DELETE_PIC = "DELETE_PIC";

export const getUser = (uid) =>{
  return (dispatch)=>{
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res)=>{
        dispatch({type: GET_USER, payload: res.data})
      })
      .catch((err)=> console.log(err));
  };
};

export const uploadPicture = (data, id)=>{
  return(dispatch)=>{
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res)=>{
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res)=>{
            dispatch({type: UPLOAD_PICTURE, payload: res.data.picture})
          })
      })
        .catch((err)=>console.log(err));
  }
}

export const updateBio = (userId, bio) =>{
  return(dispatch)=>{
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: {bio}
    })
    .then((res)=>{
      dispatch({type: UPDATE_BIO, payload:bio })
    })
    .catch((err)=> console.log(err))
  }
}

export const updatePseudo = (userId, pseudo) =>{
  return(dispatch)=>{
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: {pseudo}
    })
    .then((res)=>{
      dispatch({type: UPDATE_PSEUDO, payload:pseudo })
    })
    .catch((err)=> console.log(err))
  }
}

export const deletePicProfil = (userId)=>{
  return(dispatch)=>{
    return axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/user/delete-pic/${userId}`
    })
    .then((res)=>{
      dispatch({type: DELETE_PIC, payload: {userId}});
    })
    .catch((err)=>console.log(err));
  }
}