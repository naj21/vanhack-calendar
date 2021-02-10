import { useEffect } from "react";
import logo from "./logo.svg";
import { ThemeProvider } from "styled-components";
import themes from "./common/utils/themes";
import "./App.css";

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
    <ThemeProvider theme={themes} className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </ThemeProvider>
  );
}

export default App;
