import { createContext, useContext, useReducer, useState } from "react";

import { actionTypes } from "../constans/actionTypes";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {
  const initDataStatus = {
    status: "DEFAULT",
    msg: "",
    isAutoHide: true
  }
  const [editingUser, setEditingUser] = useState(null);
  const [dataStatus, setDataStatus] = useState(initDataStatus);

  const changeDataStatus = (newDataStatus) => {
    setDataStatus({...initDataStatus, ...newDataStatus});
  }

  const userReducer = (userList, action) => {
    const {
      CREATE, 
      READ, 
      UPDATE, 
      DELETE_SELECTED, 
      DELETE_ALL 
    } = actionTypes;

    switch(action.type) {
      case CREATE:
        return [...userList, action.user];
      case READ:
        return action.users;
      case UPDATE:
        return userList.map(user => (
          user._id === action.user._id 
            ? {...user, ...action.user}
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

  const [userList, userListDispatch] = useReducer(userReducer, []);

  const providerValues = {
    userList,
    userListDispatch,
    editingUser, 
    setEditingUser,
    dataStatus, 
    setDataStatus,
    changeDataStatus
  }

  return (
    <UserContext.Provider value={providerValues}>
      {children}
    </UserContext.Provider>
  )
}