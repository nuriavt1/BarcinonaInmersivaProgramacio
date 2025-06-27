// components/modals/ModalResposta.jsx
import styles from '../../estils/modalResposta.module.css';

export default function ModalResposta({ correcte, onTanca }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}
      
style={{
    backgroundImage: "url('/imatgesVaries/enunciats.svg')",
    //backgroundSize: "contain", // o "cover"
    backgroundSize: "100% 100%",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "90%",
  
    margin: "20px"
  }}
      >
        <h2 className="headline3">{correcte ? "Resposta Correcta!" : "Torna-hi!"}</h2>
        <p className="bodyLarge">{correcte ? "Felicitats! Has resolt l'endivinalla" : "Revisa les lletres en vermell."}</p>

        {correcte && (
          <div className={styles.nouCapitol}>
            Nou capítol desbloquejat! <br />
            Ves a la ubicació per activar el vídeo 360.
          </div>
        )}

        <button onClick={onTanca}>Següent</button>
      </div>
    </div>
  );
}
