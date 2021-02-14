import { combineReducers } from "redux";
import calendar from "calendar/redux/reducers";

const rootReducer = combineReducers({
  calendar,
});

export default rootReducer;
