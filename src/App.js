import React, { Component } from "react";
import AppRoutes from "./routes/App";
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    }
  }

  render() {
    return (
      <AppRoutes />
    );
  }
}
export default App;