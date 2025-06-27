import ButtonText from "../botons/buttonText";
import styles from "../../estils/modalBenvinguda.module.css";

export default function ModalBenvinguda({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
     
      <div className={styles.modalContent}>
        <h2 className="headline2">Benvingut a Barcelona</h2>
        <p className="bodyMedium">
          Benvingut al teu primer dia com a metge apotecari de la ciutat.
          Et tocarà resoldre enigmes, moure’t per Barcelona i ajudar a qui ho necessiti.
        </p>
        <ButtonText onClick={onClose}> Comença l’aventura </ButtonText>   
      </div>
        <img className={styles.imatge} src="/imatgesVaries/apotecaBenvinguda.svg" alt="Taula d amb estris de l'apoteca"></img>
    </div>
  );
}
