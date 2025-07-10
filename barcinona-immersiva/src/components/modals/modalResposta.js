import styles from '../../estils/modalResposta.module.css';
import ButtonText from '../botons/buttonText';

export default function ModalResposta({ correcte, onTanca }) {
  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        style={{
          backgroundImage: "url('/imatgesVaries/enunciats.svg')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "90%",
          margin: "20px"
        }}
      >
        {/* Imatge de resultat */}
        <img
          src={correcte ? "/imatgesVaries/correcta.png" : "/imatgesVaries/incorrecta.png"}
          alt={correcte ? "Resposta correcta" : "Resposta incorrecta"}
          className={styles.resultatImg}
        />

        {/* Missatge sota la imatge */}
        <p className={styles.textResposta}>
          {correcte
            ? "Felicitats! Has resolt l’endevinalla!"
            : "Resposta incorrecta. Torna-ho a intentar revisant els errors en vermell."}
        </p>

        {/* Missatge extra només si és correcte */}
        {correcte && (
          <div className={styles.nouCapitol}>
            Nou capítol desbloquejat! <br />
            Ves a la ubicació per activar el vídeo 360.
          </div>
        )}

        <ButtonText onClick={onTanca}>Següent</ButtonText>
      </div>
    </div>
  );
}
