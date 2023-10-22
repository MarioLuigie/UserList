import { actionTypes } from "../../constans/actionTypes";

const {
  CREATE, 
  READ, 
  UPDATE, 
  DELETE_SELECTED, 
  DELETE_ALL 
} = actionTypes;

const userListReducer = (userList = [], action) => {
  switch(action.type) {
    case CREATE:
      return [...userList, action.data];
    case READ:
      return action.data;
    case UPDATE:
      return userList.map(user => (
        user._id === action.data._id 
          ? {...user, ...action.data}
          : user
      ));
    case DELETE_SELECTED:
      return userList.filter(user => user._id !== action.selectedId);
    case DELETE_ALL:
      return [];
    default:
      return userList;
  }
}

export default userListReducer;