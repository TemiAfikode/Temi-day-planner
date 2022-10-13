import axiosFetch from "axiosFetch";
import React, { useContext, useReducer } from "react";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
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

const taskState = (props) => {
  const initialState = {
    tasks: [],
    loading: false,
    deleteLoading: false,
    shareLoading: false,
    task: null,
    error: null,
    pagination: null,
  };

  const [state, dispatch] = useReducer(taskReducer, initialState);

  async function getTasks(id, query) {
    dispatch({ type: TASK_REQUEST });
    try {
      const { data } = await axiosFetch.get(`/tasks/my-tasks/${id}`, {
        params: query,
      });
      if (data.isSuccessful) {
        dispatch({ type: GET_USER_TASKS_SUCCESS, payload: data });
      } else {
        dispatch({ type: TASK_FAILED, payload: data });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: TASK_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function updateTask(id, task) {
    dispatch({ type: TASK_REQUEST });
    try {
      const { data } = await axiosFetch.put(`/tasks/${id}`, task);

      if (data.isSuccessful) {
        dispatch({ type: UPDATE_TASK_SUCCESS, payload: data });
      } else {
        dispatch({ type: TASK_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: TASK_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function createTask(task, userId) {
    dispatch({ type: TASK_REQUEST });
    try {
      const { data } = await axiosFetch.post(`/tasks`, task);

      if (data.isSuccessful) {
        dispatch({ type: CREATE_TASK_SUCCESS, payload: data });
        await getTasks(userId, { date: task.dueDate });
      } else {
        dispatch({ type: TASK_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: TASK_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function deleteTask(id) {
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
      const { data } = await axiosFetch.delete(`/tasks/${id}`);

      if (data.isSuccessful) {
        dispatch({ type: DELETE_TASK_SUCCESS, payload: { data, id } });
      } else {
        dispatch({ type: TASK_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: TASK_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }
  async function shareTask(id, email) {
    dispatch({ type: SHARE_TASK_REQUEST });
    try {
      const { data } = await axiosFetch.post(`/tasks/share/${id}`, { email });

      if (data.isSuccessful) {
        dispatch({ type: SHARE_TASK_SUCCESS, payload: data });
      } else {
        dispatch({ type: TASK_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: TASK_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function clearTasks() {
    dispatch({ type: CLEAR_TASKS });
  }

  async function resetTask() {
    dispatch({ type: RESET_TASK });
  }

  async function resetError() {
    dispatch({ type: RESET_ERROR });
  }

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        task: state.task,
        error: state.error,
        pagination: state.pagination,
        getTasks,
        updateTask,
        createTask,
        clearTasks,
        deleteTask,
        shareTask,
        resetTask,
        resetError,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export function useDispatchTask() {
  return useContext(TaskContext);
}

export default taskState;
