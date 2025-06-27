import styles from '../../estils/modalCapitolNou.module.css';
import { useNivell } from '../../context/nivellContext';
import dataNivells from '../../data/nivells.json';
import ButtonText from '../botons/buttonText';

export default function ModalCapitolNou({ onClose }) {
  const { nivell } = useNivell();
  const infoNivell = dataNivells.find((n) => n.num === nivell);

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        {infoNivell ? (
          <>
            {/* Títol i subtítol dins d’un sol div */}
            <div className={styles.header}>
              <p className="headline2" style={{margin : 0}}>Capítol {nivell}</p>
              <h2 className="title2Bold" style={{margin : 0}}>{infoNivell.titol}</h2>
            </div>

            <img style={{width : "150px"}} src={`/imatgesCapitol/${infoNivell.imatge}`} alt={`Capítol ${nivell}`} />

            <p className="bodyLarge">{infoNivell.missioEndevinalles}</p>
            <ButtonText onClick={onClose}>Ves a l'endevinalla</ButtonText>
             <ButtonText onClick={onClose}>Ves al Mapa</ButtonText>
          </>
        ) : (
          <p>No s'han trobat dades per aquest nivell.</p>
        )}
      </div>
    </div>
  );
}
