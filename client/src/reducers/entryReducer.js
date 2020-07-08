import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  ENTRIES_LOADING,
  ADD_ENTRY_FAIL,
} from "../actions/types";

const initialState = {
  entries: [],
  loading: false,
  added: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        loading: false,
      };
    case ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
        added: true,
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
      };
    case ADD_ENTRY_FAIL:
      return {
        ...state,
        added: false,
      };
    case ENTRIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
