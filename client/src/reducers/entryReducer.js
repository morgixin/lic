import {
  GET_ENTRIES,
  ADD_ENTRY,
  DELETE_ENTRY,
  ENTRIES_LOADING,
} from "../actions/types";

const initialState = {
  entries: [],
  loading: false,
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
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
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
