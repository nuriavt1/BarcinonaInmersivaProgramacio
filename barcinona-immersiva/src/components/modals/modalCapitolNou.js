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
              <p className="headline2" style={{ margin: 0 }}>Capítol {nivell}</p>
              <h2 className="title2Bold" style={{ margin: 0 }}>{infoNivell.titol}</h2>
            </div>

            <img style={{ width: "150px" }} src={`/imatgesCapitol/${infoNivell.imatge}`} alt={`Capítol ${nivell}`} />

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
              <img src={'/imatgesVaries/bannerMissio.svg'} style={{ width: "182px" }}></img>
              <p className="bodyMedium" style={{ margin: "0px" }}>{infoNivell.missioEndevinalles}</p>
            </div>

            <ButtonText onClick={onClose}>Ves a l'endevinalla
              <img src='/icones/puzzle.svg'></img>
            </ButtonText>
            <ButtonText onClick={onClose}>Ves al Mapa
               <img src='/icones/map.svg'></img>
            </ButtonText>
          </>
        ) : (
          <p>No s'han trobat dades per aquest nivell.</p>
        )}
      </div>
    </div>
  );
}
