import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import pokeballIcon from "../../assets/icons/pokeball-icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./styles.scss";
import { navigationRoutes } from "../../utils/constants";
import { useAppDispatch } from "../../store/hooks";
import { resetRandomPokemons } from "../../store";

const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    ul(index);
  }, [location.pathname, navigationRoutes]);
  function ul(index: number) {
    var underlines = document.querySelectorAll<HTMLElement>(".underline");
    for (var i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  }

  return (
    <nav>
      <div className="block">
        <img
          src={pokeballIcon}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          <div className="underline"></div>
          <div className="underline"></div>
          {navigationRoutes.map(({ name, route }, index) => {
            return (
              <Link
                to={route}
                key={index}
                onClick={(e) => dispatch(resetRandomPokemons())}
              >
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};
export default Navbar;
