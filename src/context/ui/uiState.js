import React, { useReducer } from "react";
import UiContext from "./uiContext";
import uiReducer from "./uiReducer";

const uiState = (props) => {
  const initialState = {
    open: false,
    type: "",
    data: null,
  };

  const [state, dispatch] = useReducer(uiReducer, initialState);

  function setState({ type, data = null }) {
    dispatch({ type, payload: data });
  }

  return (
    <UiContext.Provider
      value={{
        open: state.open,
        type: state.type,
        data: state.data,
        setState,
      }}
    >
      {props.children}
    </UiContext.Provider>
  );
};

export default uiState;
