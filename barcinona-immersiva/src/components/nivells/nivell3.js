import { useRef, useState } from "react";
import styles from "../../estils/nivells.module.css";
import InputLletra from "../inputs/inputLletra";
import ButtonText from "../botons/buttonText";
import endevinalles from "../../data/endevinalles.json";
import { useVideos } from "../../context/videoContext";
import { useTargetes } from "../../context/targetesContext";
import { useNivell } from "../../context/nivellContext";
import ModalResposta from "../modals/modalResposta";
import ModalDesbloqueigTargetes from "../modals/modalDesbloqueigTargetes";

export default function Nivell3() {
  const paraula = ["B", "L", "A", "T"];
  const totalLletres = paraula.length;

  const endevinalla = endevinalles.find((e) => e.nivell === 3); // ✅ correcte
  const { desbloquejaVideo } = useVideos();
  const { desbloquejaTargeta, getTargetaPerId, targetes } = useTargetes();
  const { nivell, setNivell } = useNivell();

  const [letters, setLetters] = useState(Array(totalLletres).fill(""));
  const [letterStates, setLetterStates] = useState(Array(totalLletres).fill(null));
  const [respostaCorrecta, setRespostaCorrecta] = useState(false);
  const [mostraModal, setMostraModal] = useState(false);
  const [mostraModalDesbloqueig, setMostraModalDesbloqueig] = useState(false);
  const [targetesDesbloquejades, setTargetesDesbloquejades] = useState([]);

  const inputsRef = useRef([]);

  const handleChange = (index, char) => {
    const newLetters = [...letters];
    newLetters[index] = char;
    setLetters(newLetters);
  };

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index >= 0) focusInput(index);
  };

  const handleNext = (index) => {
    if (index < totalLletres) focusInput(index);
  };

  const resposta = letters.join("").toUpperCase();
  const correcta = endevinalla.resposta.toUpperCase();

  const comprovarResposta = () => {
    const novaComparacio = letters.map(
      (lletra, i) => lletra.toUpperCase() === correcta[i]
    );
    setLetterStates(novaComparacio);

    const esCorrecte = novaComparacio.every(Boolean);

    if (esCorrecte) {
      desbloquejaVideo(4); // ✅ vídeo associat al nivell 3
      endevinalla.targetesDesbloquejades.forEach((id) => desbloquejaTargeta(id));

      const novesTargetes = endevinalla.targetesDesbloquejades
        .map(getTargetaPerId)
        .filter(Boolean);

      setTargetesDesbloquejades(novesTargetes);
     // setNivell(nivell + 1); // ✅ pujar de nivell
    }

    setRespostaCorrecta(esCorrecte);
    setMostraModal(true);
  };

  return (
    <div className={styles.body}>
      <img className={styles.imatge} src="/imatgesVaries/foto1.png" />

      <div
        className="contenidorBanner"
        style={{
          backgroundImage: "url('/imatgesVaries/enunciats.svg')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-brown800)",
        }}
      >
        <p>{endevinalla.pregunta}</p>
      </div>

      <div className={styles.inputs}>
        {paraula.map((_, i) => (
          <InputLletra
            key={i}
            value={letters[i]}
            index={i}
            onChange={handleChange}
            onBackspace={handleBackspace}
            onNext={handleNext}
            ref={(el) => (inputsRef.current[i] = el)}
            correct={letterStates[i]}
          />
        ))}
      </div>

      <ButtonText onClick={comprovarResposta}>
        <p>Enviar</p>
      </ButtonText>

      {mostraModal && (
        <ModalResposta
          correcte={respostaCorrecta}
          onTanca={() => {
            setMostraModal(false);
            if (respostaCorrecta) {
              setMostraModalDesbloqueig(true);
            }
          }}
        />
      )}

      {mostraModalDesbloqueig && (
        <ModalDesbloqueigTargetes
          targetes={targetesDesbloquejades}
          onClose={() => setMostraModalDesbloqueig(false)}
        />
      )}
    </div>
  );
}
