import * as services from "../services/userServices";
import { actionTypes as action } from "../constans/actionTypes";

//Create user and send to the server
export const createUser = async (newUser, dispatch) => {
  try {
    const res = await services.createUser(newUser);

    if(!res.ok) {
      throw new Error("Failed to add user.");
    }

    const user = await res.json();
    dispatch({ type: action.CREATE, user });
    return null;

  } catch (error) {
    console.error("Error while adding user:", error);
    return "Failed to add user.";
  }
}

//Read users from the server
export const readUser = async (dispatch) => {
  try {
    const res = await services.readUsers();

    if(!res.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await res.json();

    dispatch({type: action.READ, users});

  } catch (error) {
    console.error("Network response was not ok", error);
  }
}

//Update selected user and send to the server
export const updateUser = async (formData, dispatch, editingUser) => {
  try {
    const res = await services.updateUser(formData, editingUser);

    if(!res.ok) {
      throw new Error("Failed to update user.");
    }
  
    const user = await res.json();
    
    dispatch({type: action.UPDATE, user});

    return null;

  } catch (error) {
    console.error("Error while updating selected user.");
    return "Error while updating selected user.";
  }
}

//Delete selected user and update server
export const deleteUser = async (selectedId, dispatch) => {
  try {
    const res = await services.deleteUser(selectedId);

    if(!res.ok) {
      throw new Error("Failed to remove selected user");
    }

    dispatch({type: action.DELETE_SELECTED, selectedId});
    return null;

  } catch (error) {
    console.error("Error while deletion user:", error);
    return "Error while deletion user.";
  }
}

//Delete all users and update server
export const deleteAll = async (dispatch) => {
  try {
    const res = await services.deleteAll();

    if(!res.ok) {
      throw new Error("Failed to delete users.");
    }

    dispatch({type: action.DELETE_ALL});

    return null;

  } catch (error) {
    console.error("Error while deletion users:", error);
    return "Error while deletion users.";
  }
}