import React from "react";
import pokeballLoader from "../../assets/loaders/pokeball-loader.gif";
const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={pokeballLoader} alt="" />
    </div>
  );
};

export default Loader;
