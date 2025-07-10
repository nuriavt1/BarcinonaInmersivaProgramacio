import { useState } from "react";
import styles from "../../estils/nivells.module.css";
import InputLletra from "../inputs/inputLletra";
import ButtonText from "../botons/buttonText";
import endevinalles from "../../data/endevinalles.json";
import { useVideos } from "../../context/videoContext";
import { useTargetes } from "../../context/targetesContext";
import { useNivell } from "../../context/nivellContext";
import ModalResposta from "../modals/modalResposta";
import ModalDesbloqueigTargetes from "../modals/modalDesbloqueigTargetes";

export default function Nivell4({ resolta, marcaResolta }) {
  const endevinalla = endevinalles.find((e) => e.nivell === 4);
  const respostaCorrectaText = endevinalla.resposta.toUpperCase();
  const totalLletres = respostaCorrectaText.length;

  const { desbloquejaVideo } = useVideos();
  const { desbloquejaTargeta, getTargetaPerId } = useTargetes();

  const [letters, setLetters] = useState(Array(totalLletres).fill(""));
  const [letterStates, setLetterStates] = useState(Array(totalLletres).fill(null));
  const [respostaCorrecta, setRespostaCorrecta] = useState(false);
  const [mostraModal, setMostraModal] = useState(false);
  const [mostraModalDesbloqueig, setMostraModalDesbloqueig] = useState(false);
  const [targetesDesbloquejades, setTargetesDesbloquejades] = useState([]);

  const handleChange = (index, char) => {
    const newLetters = [...letters];
    newLetters[index] = char;
    setLetters(newLetters);
  };

  const comprovarResposta = () => {
    const comparacio = letters.map(
      (lletra, i) => lletra.toUpperCase() === respostaCorrectaText[i]
    );
    setLetterStates(comparacio);

    const esCorrecte = comparacio.every(Boolean);
    setRespostaCorrecta(esCorrecte);
    setMostraModal(true);

    if (esCorrecte) {
      desbloquejaVideo(5); // vídeo associat al nivell 4
      endevinalla.targetesDesbloquejades.forEach((id) => desbloquejaTargeta(id));

      const targetes = endevinalla.targetesDesbloquejades
        .map(getTargetaPerId)
        .filter(Boolean);

      setTargetesDesbloquejades(targetes);
      marcaResolta(); // indica que el nivell ha estat resolt
    }
  };

  return (
    <div className={styles.body}>
      <img className={styles.imatge} src="/imatgesVaries/foto1.png" />

      {!resolta ? (
        <>
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
            {letters.map((lletra, i) => (
              <InputLletra
                key={i}
                index={i}
                value={lletra}
                onChange={handleChange}
                onNext={() => {}}
                onBackspace={() => {}}
                correct={letterStates[i]}
              />
            ))}
          </div>

          <ButtonText onClick={comprovarResposta}>
            <p>Enviar</p>
          </ButtonText>
        </>
      ) : (
        <div className={styles.resolt}>
          <p className="bodyMedium">Ja has resolt aquesta endevinalla!</p>
          <p className="bodyMedium">Has desbloquejat un vídeo nou! Ves a la placeta de Manuel Ribé per activarlo</p>
        </div>
      )}

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
