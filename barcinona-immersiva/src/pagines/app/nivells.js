import FooterMenu from "../../components/footerMenu";
import Nivell1 from "../../components/nivells/nivell1";
import Nivell2 from "../../components/nivells/nivell2";
import Nivell3 from "../../components/nivells/nivell3";
import Nivell4 from "../../components/nivells/nivell4";
import { useNivell } from "../../context/nivellContext";
import styles from "../../estils/nivells.module.css";
import { useState, useEffect } from "react";

function Nivells() {
  const { nivell } = useNivell();
  const [resolta, setResolta] = useState(false);

  // Quan canviem de nivell, carreguem si estava resolta
  useEffect(() => {
    const dades = JSON.parse(localStorage.getItem('endevinalles')) || {};
    setResolta(dades[`nivell${nivell}`]?.resolta || false);
  }, [nivell]);

  // Marcar nivell actual com resolt
  const marcaResolta = () => {
    const dades = JSON.parse(localStorage.getItem('endevinalles')) || {};
    dades[`nivell${nivell}`] = { resolta: true };
    localStorage.setItem('endevinalles', JSON.stringify(dades));
    setResolta(true);
  };

  const propsComuns = { resolta, marcaResolta };

  let nivellComponent;
  switch (nivell) {
    case 1:
      nivellComponent = <Nivell1 {...propsComuns} />;
      break;
    case 2:
      nivellComponent = <Nivell2 {...propsComuns} />;
      break;
    case 3:
      nivellComponent = <Nivell3 {...propsComuns} />;
      break;
    case 4:
      nivellComponent = <Nivell4 {...propsComuns} />;
      break;
    default:
      nivellComponent = <p>Has completat tots els nivells!</p>;
  }

  return (
    <div className={styles.mainBody}>
      {nivellComponent}
      <FooterMenu />
    </div>
  );
}

export default Nivells;
