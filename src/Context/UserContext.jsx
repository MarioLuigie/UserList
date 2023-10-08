import { createContext, useContext, useReducer, useState } from "react";

import { userActions } from "../constans/actions";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const [editingUser, setEditingUser] = useState(null);

  const userReducer = (userList, action) => {
    const {
      ADD, 
      READ, 
      UPDATE, 
      REMOVE_SELECTED, 
      REMOVE_ALL 
    } = userActions;

    switch(action.type) {
      case ADD:
        return [...userList, action.user];
      case READ:
        return action.users;
      case UPDATE:
        return;
      case REMOVE_SELECTED:
        return userList.filter(user => user._id !== action.selectedId);
      case REMOVE_ALL:
        return [];
      default:
        return userList;
    }
  }

  const [userList, userListDispatch] = useReducer(userReducer, []);

  const providerValues = {
    userList,
    userListDispatch,
    editingUser, 
    setEditingUser
  }

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  )
}