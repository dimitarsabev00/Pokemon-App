import React from "react";
import { useLocation } from "react-router-dom";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { pokemonTabs } from "../../utils/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { signOut } from "@firebase/auth";
import { auth } from "../../configs/firebase";
import { setPokemonTab, setToast, setUserStatus } from "../../store";

import "./styles.scss";

const Footer: React.FC = () => {
  const { userInfo } = useAppSelector(({ generalSlice }) => generalSlice);

  const location = useLocation();
  const currentPokemonTab = useAppSelector(
    ({ generalSlice: { currentPokemonTab } }) => currentPokemonTab
  );
  const dispatch = useAppDispatch();
  const logOutUser = () => {
    signOut(auth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged out successfully from Firebase"));
  };
  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];
  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => (
              <li
                key={route.name}
                className={`${
                  currentPokemonTab === route.name ? "active" : ""
                }`}
                onClick={() => dispatch(setPokemonTab(route.name))}
              >
                {route.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="block">
        {userInfo && <MdOutlinePowerSettingsNew onClick={logOutUser} />}
      </div>
    </footer>
  );
};

export default Footer;
