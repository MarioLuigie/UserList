import * as services from "../services/userServices";
import { typeActions } from "../constans/typeActions";

const { CREATE, READ, UPDATE, DELETE_SELECTED, DELETE_ALL } = typeActions;

export const createUser = async (newUser, dispatch) => {
  try {
    const res = await services.createUser(newUser);

    if(!res.ok) {
      throw new Error("Failed to add user.");
    }

    const user = await res.json();
    dispatch({ type: CREATE, user });

  } catch (error) {
    console.error("Error while adding user:", error);
  }
}

export const readUser = async (dispatch) => {
  try {
    const res = await services.readUsers();

    if(!res.ok) {
      throw new Error("Network response was not ok");
    }

    const users = await res.json();

    dispatch({type: READ, users});

  } catch (error) {
    console.error("Network response was not ok", error);
  }
}

export const updateUser = async (formData, dispatch, editingUser) => {
  try {
    const res = await services.updateUser(formData, editingUser);

    if(!res.ok) {
      throw new Error("Failed to update user.");
    }
  
    const user = await res.json();
    
    dispatch({type: UPDATE, user});
  } catch (error) {
    console.error("Error while updating selected user.");
  }

}

export const deleteUser = async (selectedId, dispatch) => {
  try {
    const res = await services.deleteUser(selectedId);

    if(!res.ok) {
      throw new Error("Failed to remove selected user");
    }

    dispatch({type: DELETE_SELECTED, selectedId});

  } catch (error) {
    console.error("Error while deletion user:", error);
  }
}

export const deleteAll = async (dispatch) => {
  try {
    const res = await services.deleteAll();

    if(!res.ok) {
      throw new Error("Failed to delete users.");
    }

    dispatch({type: DELETE_ALL});

  } catch (error) {
    console.error("Error while deletion users:", error);
  }
}