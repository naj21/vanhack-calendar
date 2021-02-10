import axios from "axios";

export function init(initConfig, dispatch) {
  axios.interceptors.request.use(function (config) {
    config.baseURL = initConfig.baseURL;
    return config;
  });
}
