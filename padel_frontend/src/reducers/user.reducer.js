import { DELETE_PIC, GET_USER, UPDATE_BIO, UPDATE_PSEUDO, UPLOAD_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action){
  switch(action.type){
    case GET_USER: 
      return action.payload;
    case UPLOAD_PICTURE:
      return{
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return{
        ...state,
        bio: action.payload,
      };
    case UPDATE_PSEUDO:
    return{
      ...state,
      pseudo: action.payload,
    };
    case DELETE_PIC:
        return state.filter((user) => user._id !== action.payload.userId);          
    default:
      return state;
  }
}