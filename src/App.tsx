import React, { Suspense, lazy } from "react";
import { Background, Footer, Loader, NavBar, Wrapper } from "./components";
import "./App.scss";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

const Search = lazy(() => import("./screens/Search"));
const MyList = lazy(() => import("./screens/MyList"));
const About = lazy(() => import("./screens/About"));
const Compare = lazy(() => import("./screens/Compare"));
const Pokemon = lazy(() => import("./screens/Pokemon"));

const App: React.FC = () => {
  return (
    <div className="main-container">
      <Background />
      <Router>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <NavBar />
            <Wrapper />
            {/* All Routes Crash Design at the moment!!! */}
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<About />} path="/about" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
          </div>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
