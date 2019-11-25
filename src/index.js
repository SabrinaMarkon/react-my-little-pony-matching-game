import React from "react";
import ReactDOM from "react-dom";
import Grid from "./components/Grid";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
