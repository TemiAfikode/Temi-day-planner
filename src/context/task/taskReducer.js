import {
  CLEAR_TASKS,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  GET_USER_TASKS_SUCCESS,
  RESET_ERROR,
  RESET_TASK,
  SHARE_TASK_REQUEST,
  SHARE_TASK_SUCCESS,
  TASK_FAILED,
  TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from "./taskType";

export default function (state, action) {
  switch (action.type) {
    case TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload.data,
        pagination: action.payload.pagination,
      };
    case TASK_FAILED:
      return {
        ...state,
        loading: false,
        deleteLoading: false,
        shareLoading: false,
        error: action.payload,
      };
    case UPDATE_TASK_SUCCESS:
    case SHARE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        shareLoading: false,
        error: null,
        task: action.payload,
        tasks: state.tasks.map((task) => {
          if (task._id === action.payload.data._id) {
            return action.payload.data;
          } else {
            return task;
          }
        }),
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        deleteLoading: true,
      };
    case SHARE_TASK_REQUEST:
      return {
        ...state,
        shareLoading: true,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        error: null,
        tasks: state.tasks.filter((task) => task._id !== action.payload.id),
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        tasks: [action.payload.data, ...state.tasks],
        task: action.payload,
      };
    case CLEAR_TASKS:
      return {
        ...state,
        loading: false,
        tasks: [],
        task: null,
        error: null,
      };
    case RESET_TASK:
      return {
        ...state,
        task: null,
      };
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
