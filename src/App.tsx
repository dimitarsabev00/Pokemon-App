import React, { Suspense, lazy, useEffect } from "react";
import { Background, Footer, Loader, NavBar } from "./components";
import "./App.scss";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearToasts } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";

const Search = lazy(() => import("./screens/Search"));
const MyList = lazy(() => import("./screens/MyList"));
const About = lazy(() => import("./screens/About"));
const Compare = lazy(() => import("./screens/Compare"));
const Pokemon = lazy(() => import("./screens/Pokemon"));

const App: React.FC = () => {
  const { toasts } = useAppSelector(({ generalSlice }) => generalSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);
  return (
    <div className="main-container">
      <Background />
      <Router>
        <Suspense fallback={<Loader />}>
          <div className="app">
            <NavBar />
            <Routes>
              <Route element={<Search />} path="/search" />
              <Route element={<MyList />} path="/list" />
              <Route element={<About />} path="/about" />
              <Route element={<Compare />} path="/compare" />
              <Route element={<Pokemon />} path="/pokemon/:id" />
              <Route element={<Navigate to="/pokemon/1" />} path="*" />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
