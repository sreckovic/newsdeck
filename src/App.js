import React, { Component } from "react";

import Newsdeck from "./components/newsdeck/Newsdeck";

import "./assets/normalize.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="newsdeck">
        <header>
          <h1>News Deck</h1>
        </header>
        <Newsdeck />
      </div>
    );
  }
}

export default App;
