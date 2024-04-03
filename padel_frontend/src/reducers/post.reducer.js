import { DELETE_COMMENT, DELETE_PICTURE, DELETE_POST, DELETE_VIDEO, EDIT_COMMENT, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_ARTICLE, UPDATE_PICTURE, UPDATE_SUBTITLE, UPDATE_TITLE, UPDATE_VIDEO } from "../actions/post.actions";

const initialState = {}

export default function postReducer(state = initialState, action){
  switch (action.type){
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers]
          };
        } 
        return post;
      }); 
    case UNLIKE_POST:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            likers: post.likers.filter((id)=> id !== action.payload.userId)
          }
        }
        return post;
      });
    case UPDATE_TITLE:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            title: action.payload.title
          };
        } else return post;
      });    
    case UPDATE_SUBTITLE:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            subtitle: action.payload.subtitle
          };
        } else return post;
      });    
    case UPDATE_ARTICLE:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            article: action.payload.article
          };
        } else return post;
      });  
    case UPDATE_VIDEO:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            article: action.payload.video
          };
        } else return post;
      });  
    case UPDATE_PICTURE:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            article: action.payload.file[0]
          };
        } else return post;
      });  
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.post_id);
    case DELETE_PICTURE:
      return state.filter((post) => post._id !== action.payload.postId);      
    case DELETE_VIDEO:
      return state.filter((post)=> post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post)=>{
        if(post._id === action.payload.postId){
          return{
            ...post,
            comments: post.comments.map((comment)=>{
              if(comment._id === action.payload.commentId){
                return{
                  ...comment,
                  text: action.payload.text
                }
              }else {
                return comment;
              }
            })
          }
        } else {
          return post;
        }
      });    
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
          };
        } else {
          return post;
        }
      });
    default:
      return state;
  }
}