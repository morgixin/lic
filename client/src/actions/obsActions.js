import axios from "axios";
import {
  GET_ENTRIES,
  GET_ENTRY,
  ADD_ENTRY,
  ADD_ENTRY_FAIL,
  DELETE_ENTRY,
  ENTRIES_LOADING,
  UPDATE_ENTRY,
  UPDATE_ENTRY_FAIL,
} from "../actions/types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

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

export const getEntry = (id) => (dispatch) => {
  dispatch(setEntriesLoading());
  axios
    .get(`/api/entries/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ENTRY,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addEntry = (entry) => (dispatch, getState) => {
  axios
    .post("/api/entries", entry, tokenConfig(getState))
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
      dispatch({ type: ADD_ENTRY_FAIL });
    });
};

export const updateEntry = (entry) => (dispatch, getState) => {
  axios
    .put(`/api/entries/${entry._id}`, entry, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: UPDATE_ENTRY,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_ENTRY_FAIL"
        )
      );
      dispatch({ type: UPDATE_ENTRY_FAIL });
    });
};

export const deleteEntry = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/entries/${id}`, tokenConfig(getState))
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
