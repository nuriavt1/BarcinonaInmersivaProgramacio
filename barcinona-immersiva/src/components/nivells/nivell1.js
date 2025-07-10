import { useRef, useState } from "react";
import InputLletra from "../inputs/inputLletra";
import styles from "../../estils/nivells.module.css";
import { useTargetes } from "../../context/targetesContext";
import { useNivell } from "../../context/nivellContext";
import endevinalles from "../../data/endevinalles.json";
import { useVideos } from "../../context/videoContext"; // suposant que és aquest el nom
import ButtonText from "../botons/buttonText";
import ModalResposta from "../modals/modalResposta";
import ModalDesbloqueigTargetes from "../modals/modalDesbloqueigTargetes";



export default function Nivell1({resolta, marcaResolta}) {
    // Paraules del nivell (com a grups de lletres)
    const paraules = [
        ["C", "A", "R", "R", "E", "R"],
        ["D", "E"],
        ["L", "A"],
        ["C", "I", "U", "T", "A", "T"]
    ];
    const endevinalla = endevinalles.find((e) => e.nivell === 1);
    const { desbloquejaVideo } = useVideos();
    const { desbloquejaTargeta } = useTargetes();
    const [mostraModalDesbloqueig, setMostraModalDesbloqueig] = useState(false);
const [targetesDesbloquejades, setTargetesDesbloquejades] = useState([]);

const { targetes } = useTargetes();


    // Llista plana de totes les lletres (sense espais)
    const totalLletres = paraules.flat().length;

    const [letters, setLetters] = useState(Array(totalLletres).fill(""));
    const [letterStates, setLetterStates] = useState(Array(totalLletres).fill(null)); // null, true o false
    const inputsRef = useRef([]);

    const [mostraModal, setMostraModal] = useState(false);
    const [respostaCorrecta, setRespostaCorrecta] = useState(false);


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
    // Desbloqueja targetes
    endevinalla.targetesDesbloquejades.forEach((id) => {
      desbloquejaTargeta(id);
    });

    desbloquejaVideo(2);
    marcaResolta();

    // Obté objectes complets de les targetes
    const novesTargetes = endevinalla.targetesDesbloquejades
      .map((id) => targetes.find((t) => t.id == id))
      .filter(Boolean); // evita undefined

    setTargetesDesbloquejades(novesTargetes);
  }

  setRespostaCorrecta(esCorrecte);
  setMostraModal(true); // mostra modal de correcte/incorrecte
  
};





    return (
        <div className={styles.body}>
            {/*   <h2>Nivell 1</h2> */}
            <img className={styles.imatge} src="/imatgesVaries/foto1.png"></img>




{!resolta ? (
    
  <>
              <div className="contenidorBanner"
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
                }}>
                <p className="bodyMedium"
                    style={{
                        marginLeft: "38px",
                        marginRight: "38px"
                    }}
                >
                    {endevinalla.pregunta}
                </p>
            </div>
    <div className={styles.inputs}>
      {paraules.reduce((acc, word, wordIndex) => {
        const offset = paraules.slice(0, wordIndex).flat().length;

        const inputs = word.map((_, i) => {
          const globalIndex = offset + i;
          return (
            <InputLletra
              key={globalIndex}
              value={letters[globalIndex]}
              index={globalIndex}
              onChange={handleChange}
              onBackspace={handleBackspace}
              onNext={handleNext}
              ref={(el) => (inputsRef.current[globalIndex] = el)}
              correct={letterStates[globalIndex]}
            />
          );
        });

        acc.push(
          <div key={wordIndex} style={{ display: "flex", gap: "1px" }}>
            {inputs}
          </div>
        );

        return acc;
      }, [])}
    </div>

    <ButtonText onClick={comprovarResposta}><p>Enviar</p></ButtonText>
  </>
) : (
  <div className={styles.resolt}>
    <p className="bodyMedium">Ja has resolt aquesta endevinalla!</p>
     <p className="bodyMedium">Has debloquejat un video nou! Dirigeix-te a Plaça del rei per activar el vídeo!</p>
    {/* Aquí pots posar un botó per continuar, veure el vídeo, o qualsevol altra acció */}
  </div>
)}

       
{mostraModal && (
  <ModalResposta
    correcte={respostaCorrecta}
    onTanca={() => {
      setMostraModal(false);
      if (respostaCorrecta) {
        setMostraModalDesbloqueig(true); // Mostra les targetes desbloquejades
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
