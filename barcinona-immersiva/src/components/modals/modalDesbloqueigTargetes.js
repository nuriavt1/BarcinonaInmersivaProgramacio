import { useState } from 'react';
import styles from '../../estils/modalDesbloqueigTargetes.module.css';
import Targeta from '../targetes/targeta';
import { useNavigate } from 'react-router-dom';
import ButtonText from '../botons/buttonText';
import { FaCheck } from 'react-icons/fa';

export default function ModalDesbloqueigTargetes({ targetes, onClose }) {
  const [recollint, setRecollint] = useState(false);
const navigate = useNavigate();

 const handleRecollir = () => {
  setRecollint(true);

  //Vibració (si està suportada pel dispositiu)
  if (navigator.vibrate) {
    navigator.vibrate([200]); // dues vibracions curtes separades
  }

  setTimeout(() => {
    onClose();
  }, 600);
};

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
     

        <div className={styles.targetesContainer}>
          {targetes.map((targeta) => (
            <div
              key={targeta.id}
              className={`${styles.animada} ${recollint ? styles.sortida : ''}`}
            >
              <Targeta 
                {...targeta}
                 className={styles.brillant}
                onClick={() =>
                  navigate('/detalls', { state: { id: targeta.id } })
                }
              />
            </div>
          ))}
        </div>
   <h2 className="headline3" /*className={styles.titol}*/ style={{ marginTop: "4px", marginBottom: "4px" }}>HAS DESBLOQUEJAT NOVES TARGETES!</h2>
    <p className="bodySmall" style={{ margin: 0 }}> 
Cada targeta conté informació sobre un lloc, un personatge o un moment clau de la Barcelona medieval.
    </p>
   <p className="bodyMediumBold" style={{ margin: 0 }}> 
    Ja formen part de la teva col·lecció! Pots consultar-les sempre que vulguis a la Biblioteca.</p>
     <ButtonText className={styles.boto} onClick={handleRecollir} >
      Recollir
<FaCheck size={24} color="var(--color-white)" />
      </ButtonText>
      </div>
    </div>
  );
}
