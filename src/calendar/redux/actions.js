import actionTypes from "./actionTypes";

export function requestCalendar() {
  return {
    type: actionTypes.REQUEST_CALENDAR,
  };
}

export function requestCalendarSuccess(data) {
  return {
    type: actionTypes.REQUEST_CALENDAR_SUCCESS,
    payload: data,
  };
}

export function requestCalendarFailure(error) {
  return {
    type: actionTypes.REQUEST_CALENDAR_FAILURE,
    payload: error,
  };
}
