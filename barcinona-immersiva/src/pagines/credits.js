import { useNavigate } from 'react-router-dom';
import ButtonText from '../components/botons/buttonText';
import ButtonRetorn from '../components/botons/buttonRetorn';
import style from '../estils/home.module.css';

function Credits() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      backgroundColor: "var(--color-brown800)",
      height: "100dvh",
      color: "var(--color-white)",
      position: "relative",
      paddingLeft: "32px",
      paddingRight: "32px",
      paddingBottom: "80px", // deixem espai perquè la imatge no tapi text
      boxSizing: "border-box"
    }}>
      <ButtonRetorn color="var(--color-white)" />
      <p className="headline2">CRÈDITS</p>
      <p className="bodyMedium" style={{ margin: 0 }}>Núria Vaquero Tell</p>
      <p className="bodyMedium" style={{ margin: 0 }}>
        Estudianta del CITM – Centre de la Imatge i la Tecnologia Multimèdia, Universitat Politècnica de Catalunya – UPC
      </p>
      <p className="bodyMedium" style={{ margin: 0 }}>
        Aquest projecte ha estat creat, dissenyat i desenvolupat com a part del Treball de Fi de Grau de Núria Vaquero Tell, sota la tutoria de Pedro Omedas.
      </p>

      {/* Imatge de fons al final */}
      <img
        src='/imatgesVaries/houses.png'
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 0,
          pointerEvents: "none"
        }}
        alt="Decoració inferior"
      />
    </div>
  );
}

export default Credits;
