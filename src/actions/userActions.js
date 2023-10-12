import * as services from "../services/userServices";
import { actionTypes as action } from "../constans/actionTypes";

//Create user and send to the server
export const createUser = async (newUser, dispatch) => {
  try {
    const { data } = await services.createUser(newUser);

    dispatch({ type: action.CREATE, data });
    return null;

  } catch (error) {
    console.error("Error while adding user:", error);
    return "Failed to add user.";
  }
}

//Read users from the server
export const readUser = async (dispatch) => {
  try {
    const { data } = await services.readUsers();

    dispatch({type: action.READ, data});

  } catch (error) {
    console.error("Network response was not ok", error);
  }
}

//Update selected user and send to the server
export const updateUser = async (formData, dispatch, id) => {
  try {
    const { data } = await services.updateUser(formData, id);

    dispatch({type: action.UPDATE, data});
    return null;

  } catch (error) {
    console.error("Error while updating selected user.");
    return "Error while updating selected user.";
  }
}

//Delete selected user and update server
export const deleteUser = async (selectedId, dispatch) => {
  try {
    await services.deleteUser(selectedId);

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
    await services.deleteAll();

    dispatch({type: action.DELETE_ALL});
    return null;

  } catch (error) {
    console.error("Error while deletion users:", error);
    return "Error while deletion users.";
  }
}