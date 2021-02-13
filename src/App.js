import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import themes from "./common/utils/themes";
import configureStore from "./store";
import { init } from "./common/utils/api";
import "./App.css";
import Calendar from "./calendar";

const store = configureStore();
init({ baseURL: " https://api-test.vanhack.dev" }, store.dispatch);

function App() {
  useEffect(() => {
    var styleText =
      "::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;";
    var unfocus_style = document.createElement("STYLE");

    window.unfocus = function () {
      document.getElementsByTagName("HEAD")[0].appendChild(unfocus_style);

      document.addEventListener("mousedown", function () {
        unfocus_style.innerHTML = styleText;
      });
      document.addEventListener("keydown", function () {
        unfocus_style.innerHTML = "";
      });
    };

    window.unfocus();
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes} className="App">
        <Calendar />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
