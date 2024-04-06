import pokeball1 from "../../assets/images/pokeball.png";
import pokeball2 from "../../assets/images/pokeball2.png";
import "./styles.scss";

export default function Background() {
  return (
    <div className="background">
      <img src={pokeball1} alt="" className="pokeball pokeball-1" />
      <img src={pokeball2} alt="" className="pokeball pokeball-2" />
      <img src={pokeball1} alt="" className="pokeball pokeball-3" />
      <img src={pokeball2} alt="" className="pokeball pokeball-4" />
      <img src={pokeball1} alt="" className="pokeball pokeball-5" />
      <img src={pokeball2} alt="" className="pokeball pokeball-6" />
    </div>
  );
}
