/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useState } from "react";
import PropTypes from "prop-types";

import { actionTypes } from "../constans/actionTypes";

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function ContextProvider({ children }) {
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

  // const userReducer = (userList, action) => {
  //   const {
  //     CREATE, 
  //     READ, 
  //     UPDATE, 
  //     DELETE_SELECTED, 
  //     DELETE_ALL 
  //   } = actionTypes;

  //   switch(action.type) {
  //     case CREATE:
  //       return [...userList, action.data];
  //     case READ:
  //       return action.data;
  //     case UPDATE:
  //       return userList.map(user => (
  //         user._id === action.data._id 
  //           ? {...user, ...action.data}
  //           : user
  //       ));
  //     case DELETE_SELECTED:
  //       return userList.filter(user => user._id !== action.selectedId);
  //     case DELETE_ALL:
  //       return [];
  //     default:
  //       return userList;
  //   }
  // }

  // const [userList, userListDispatch] = useReducer(userReducer, []);

  const providerValues = {
    // userList,
    // userListDispatch,
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

ContextProvider.propTypes = {
  children: PropTypes.node
}