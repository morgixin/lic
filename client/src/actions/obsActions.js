import axios from "axios";
import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  ENTRIES_LOADING,
  ADD_ENTRY_FAIL,
} from "../actions/types";
import { returnErrors } from "./errorActions";

export const getEntries = () => (dispatch) => {
  dispatch(setEntriesLoading());
  axios
    .get("/api/entries")
    .then((res) =>
      dispatch({
        type: GET_ENTRIES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addEntry = (entry) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  entry = JSON.stringify(entry);

  axios
    .post("/api/entries", entry, config)
    .then((res) =>
      dispatch({
        type: ADD_ENTRY,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_ENTRY_FAIL")
      );
      dispatch({
        type: ADD_ENTRY_FAIL,
      });
    });
};

export const deleteEntry = (id) => (dispatch) => {
  axios
    .delete(`/api/entries/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ENTRY,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setEntriesLoading = () => {
  return {
    type: ENTRIES_LOADING,
  };
};
