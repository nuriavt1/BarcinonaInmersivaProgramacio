import FooterMenu from "../../components/footerMenu";
import Nivell1 from "../../components/nivells/nivell1";
import Nivell2 from "../../components/nivells/nivell2";
import Nivell3 from "../../components/nivells/nivell3";
import Nivell4 from "../../components/nivells/nivell4";
import { useNivell } from "../../context/nivellContext";
import styles from "../../estils/nivells.module.css";
import { useState } from "react";

function Nivells() {
  const { nivell } = useNivell();
  const [endevinallaActual, setEndevinallaActual] = useState(null);

  let nivellComponent;

  switch (nivell) {
    case 1:
      nivellComponent = <Nivell1 />;
      break;
    case 2:
      nivellComponent = <Nivell2 />;
      break;
    case 3:
      nivellComponent = <Nivell3 />;
      break;
    case 4:
      nivellComponent = <Nivell4 />;
      break;
    default:
      nivellComponent = <p>Has completat tots els nivells!</p>;
  }

  return (
    <div className={styles.mainBody}>
   {/*   <h2>Estàs al nivell {nivell}</h2> */} 


      {nivellComponent}
      <FooterMenu />
    </div>
  );
}

export default Nivells;