import React from "react";
import pokeballLoader from "../../assets/loaders/pokeball-loader.gif";
import './styles.scss'
const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={pokeballLoader} alt="" />
    </div>
  );
};

export default Loader;
