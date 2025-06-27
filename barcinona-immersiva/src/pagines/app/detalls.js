
import { useLocation } from 'react-router-dom';
import { useTargetes } from '../../context/targetesContext';
import ButtonRetorn from '../../components/botons/buttonRetorn';
import styles from "../../estils/detalls.module.css";

function Detalls() {
    const { state } = useLocation();
    const { getTargetaPerId } = useTargetes(); // Usa el context
    const targeta = getTargetaPerId(state?.id);

    if (!targeta) return <p>No s’ha trobat la targeta.</p>;

    return (
        <div className={styles.body}>
       

            <img
                className={styles.imatge}
                src={`imatgesTargetes/${targeta.imatge}`}
                alt={targeta.nom}
            />
               <ButtonRetorn  className={styles.buttonReturn}/>
            <div className={styles.infoContent}>
                <h1 className="headline2">{targeta.nom}</h1>
                <p className="bodyLarge">{targeta.contingut}</p>
            </div>
        </div>
    );
}


export default Detalls;