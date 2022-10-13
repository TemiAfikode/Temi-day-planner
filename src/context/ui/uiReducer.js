import {
  CLOSE_TASK_MODAL,
  EDIT_TASK_MODAL,
  ADD_TASK_MODAL,
  LOADING_MODAL,
  VIEW_TASK_MODAL,
  SHARE_TASK_MODAL,
} from "./uiType";

export default function (state, action) {
  switch (action.type) {
    case ADD_TASK_MODAL:
      return {
        ...state,
        open: true,
        type: ADD_TASK_MODAL,
        data: action.payload,
      };
    case EDIT_TASK_MODAL:
      return {
        ...state,
        open: true,
        type: EDIT_TASK_MODAL,
        data: action.payload,
      };
    case VIEW_TASK_MODAL:
      return {
        ...state,
        open: true,
        type: VIEW_TASK_MODAL,
        data: action.payload,
      };
    case SHARE_TASK_MODAL:
      return {
        ...state,
        open: true,
        type: SHARE_TASK_MODAL,
        data: action.payload,
      };
    case LOADING_MODAL:
      return {
        ...state,
        open: true,
        type: LOADING_MODAL,
        data: action.payload,
      };
    case CLOSE_TASK_MODAL:
      return {
        ...state,
        open: false,
        type: "",
        data: null,
      };

    default:
      return state;
  }
}
