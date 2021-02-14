import actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const initialListState = {
  loading: false,
  data: [],
  error: null,
};

function events(state = initialListState, action) {
  switch (action.type) {
    case actionTypes.REQUEST_CALENDAR:
      return { ...state, error: null, loading: true };

    case actionTypes.REQUEST_CALENDAR_SUCCESS:
      // modify data to have items with DONE status
      const newData = action.payload.data.map((item, i) => {
        if (item.status === "Scheduled" && i > 5) {
          return { ...item, status: "Done" };
        }
        return item;
      });
      return { ...state, data: newData, loading: false };

    case actionTypes.REQUEST_CALENDAR_FAILURE:
      return { ...state, error: action.payload.error, loading: false };

    default:
      return state;
  }
}

export default combineReducers({
  events,
});
