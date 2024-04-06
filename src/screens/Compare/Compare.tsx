import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Wrapper } from "../../components";
import CompareContainer from "./CompareContainer";

import "./styles.scss";

const Compare: React.FC = () => {
  const { compareQueue } = useAppSelector(({ pokemonSlice }) => pokemonSlice);
  return (
    <div className="compare">
      <CompareContainer
        pokemon={compareQueue[0]}
        isEmpty={compareQueue.length < 1}
      />
      <CompareContainer
        pokemon={compareQueue[1]}
        isEmpty={compareQueue.length < 2}
      />
    </div>
  );
};

export default Wrapper(Compare);
