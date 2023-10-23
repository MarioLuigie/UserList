import { actionTypes } from "../../constans/actionTypes";

const {
  SUCCESS,
  ERROR,
  PENDING
} = actionTypes;

const initState = {
  isLoading: false,
  error: null,
  success: null
}

const apiReducer = (state = initState, action) => {

  switch (action.type) {
    case SUCCESS:
      return state;
    case ERROR:
      return state;
    case PENDING:
      return state;
    default:
      return state;
  }
}

export default apiReducer;