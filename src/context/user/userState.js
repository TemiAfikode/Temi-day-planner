import React, { useReducer } from "react";

import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
  LOAD_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  USER_FAILED,
  USER_REQUEST,
} from "./userType";
import { CLEAR_TASKS } from "../task/taskType";
import axiosFetch from "axiosFetch";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";

const userState = (props) => {
  const router = useRouter();

  const initialState = {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
    isLoggedOut: false,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  async function registerUser(payload) {
    dispatch({ type: USER_REQUEST });
    try {
      const { data } = await axiosFetch.post("/users", payload);
      if (data.isSuccessful) {
        const res = await signIn("credentials", {
          callbackUrl: "/dashboard",
          redirect: false,
          email: payload.email,
          password: payload.password,
        });
        if (res.ok) {
          router.push("/dashboard");
          dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
        } else {
          dispatch({
            type: USER_FAILED,
            payload: { error: { message: res.error, path: null } },
          });
        }
      } else {
        dispatch({ type: USER_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function loadUser() {
    dispatch({ type: USER_REQUEST });
    try {
      const { data } = await axiosFetch.get("/users/profile");
      if (data.isSuccessful) {
        dispatch({ type: LOAD_USER_SUCCESS, payload: data });
      } else {
        dispatch({ type: USER_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  async function logoutUser() {
    dispatch({ type: USER_REQUEST });
    try {
      const { data } = await axiosFetch.get("/users/logout");
      if (data.isSuccessful) {
        await signOut({callbackUrl:'/', redirect: true });
        dispatch({ type: CLEAR_TASKS });
        dispatch({ type: LOGOUT_USER_SUCCESS });
      } else {
        dispatch({ type: USER_FAILED, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_FAILED,
        payload: error.response ? error.response.data.error : error.message,
      });
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
        isLoggedOut: state.isLoggedOut,
        registerUser,
        loadUser,
        logoutUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default userState;
