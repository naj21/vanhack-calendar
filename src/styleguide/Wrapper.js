import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import themes from "../common/utils/themes";

export default class Wrapper extends Component {
  render() {
    return <ThemeProvider theme={themes}>{this.props.children}</ThemeProvider>;
  }
}
