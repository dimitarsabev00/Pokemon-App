import React from "react";
import { Background, Footer, NavBar, Wrapper } from "./components";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <NavBar />
          <Wrapper />
          {/* <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<About />} path="/about" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes> */}
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
