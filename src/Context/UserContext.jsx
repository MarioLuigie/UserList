/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

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
  const providerValues = {
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