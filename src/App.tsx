import React from "react";
import { Background, NavBar } from "./components";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <NavBar />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
