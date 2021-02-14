import axios from "axios";
import * as actions from "./actions";

export function getCalendarThunk(details) {
  return (dispatch) => {
    dispatch(actions.requestCalendar());
    axios
      .get("/calendar")
      .then((response) => {
        dispatch(actions.requestCalendarSuccess(response));
      })
      .catch((e) => {
        return dispatch(actions.requestCalendarFailure(e));
      });
  };
}
