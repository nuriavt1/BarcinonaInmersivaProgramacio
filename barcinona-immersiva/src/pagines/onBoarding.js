import { useNavigate } from 'react-router-dom';
import ButtonText from '../components/botons/buttonText';
import ButtonRetorn from '../components/botons/buttonRetorn';
import style from '../estils/onboarding.module.css';
import { FaPlay } from "react-icons/fa";
import { useVideos } from "../context/videoContext";
import { useTargetes } from "../context/targetesContext";
import { useState } from 'react';
import ModalBenvinguda from "../components/modals/modalBenvinguda"; // adapta la ruta si cal
import ModalDesbloqueigTargetes from "../components/modals/modalDesbloqueigTargetes";
import ModalCapitolNou from "../components/modals/modalCapitolNou";


function OnBoarding() {

  //Per redirigir l'usuari
  const navigate = useNavigate();
  //Funcio per obtenir un video pel seu id.
  const { getVideoPerId } = useVideos();
  //Estat per mostrar el primer moda.
  const [mostraBenvinguda, setMostraBenvinguda] = useState(false);
  //Estat per mostrar el segon modal.
  const [mostraDesbloqueig, setMostraDesbloqueig] = useState(false);
  //Estat per mostrar el tercer modal.
  const [mostraCapitolNou, setMostraCapitolNou] = useState(false);
  //Funció per desbloquejar targetes.
  const { desbloquejaTargeta } = useTargetes();
  //Obté totes les targetes disponibles.
  const { targetes } = useTargetes();

  //Obtenim el video de Introducció.
  const video = getVideoPerId(1);

  //Ids de les targetes que desbloquegem en aquest video.
  const idsTargetes = video.targetesDesbloquejades || [];
  // Converteix els IDs en objectes de targeta.
  const targetesDesbloquejades = idsTargetes
    .map(id => targetes.find(t => t.id === id))
    .filter(Boolean); // Evita undefined.

  //S'activa quan l'usuari li dona a reproduir video.
  const handleClick = () => {
    // const video = getVideoPerId(1);
    //S'obté el video en una nova pestanya.
    if (video?.url) {
      window.open(video.url, "_blank");
    }
    setMostraBenvinguda(true); //Es mostra el primer modal de benvinguda.
  };

  //S'activa quan es tanca el primer modal (Modal Benvinguda
  const handleTancaBenvinguda = () => {
    setMostraBenvinguda(false); //Amaga el primer modal
    setMostraDesbloqueig(true); //Mostra el segon modal
  };

  //S'activa quan es tanca el segon modal (Modal Desbloqueig Targetes)
  const handleTancaDesbloqueig = () => {

    // Primer desbloqueja les targetes
    idsTargetes.forEach(id => {
      desbloquejaTargeta(id);
    });

    setTimeout(() => {
      setMostraDesbloqueig(false); //Amaga el modal de targetes
      setMostraCapitolNou(true); //Mostra el modal de Nou capítol.
    }, 300); //Retard de 30ms.
  };

  //S'activa quan es tanca el tercer i ultim modal (ModalCapitolNou) 
  const handleTancaOnBoarding = () => {
    navigate("/nivells"); //Redirigeix a la pantalla principal.
  }

  return (

    <div className={style.body}>
      {/*Boto per tornar enrere*/}
      <ButtonRetorn  color="var(--color-white)"  className={style.botoRetorn} style={{ position: "fixed", top: 0, left: 0, }}></ButtonRetorn>
      <p className="headline2" style={{ width: "100%" }}>Estàs a punt de veure un vídeo a 360°!</p>

<div className={style.contentContainer}>
<div className={style.cont}>
        <img src='/imatgesVaries/onboardingMa.png' alt='mà amb fletxa rotatoria' style={{width: "50px"}}></img>
        <p className="bodyMediumBold">Arrossega amb el dit o mou el dispositiu per explorar l'escena completa.</p>
      </div>
      <div className={style.cont}>
        <img src='/imatgesVaries/onboardingCascos.png' alt='auriculars' style={{width: "50px"}}></img>
        <p className="bodyMediumBold" >Posa’t auriculars.</p>
      </div>
      <div className={style.cont}>
        <img src='/imatgesVaries/onboardingUlls.png' alt='ulls' style={{width: "50px"}}></img>
        <p className="bodyMediumBold" >Mira al teu voltant.</p>
      </div>
</div>
      

      {/* <ButtonText onClick={() => navigate('/video', { state: { src: videoSrc } })}>
       Reprodueix
      </ButtonText> */}

      {/*Botó per reproduir el video*/}
      <ButtonText onClick={handleClick}>
        Reprodueix video
        <FaPlay size={32}></FaPlay>
      </ButtonText>

      {/*Segons l'estat del use state es mostren els modals*/}
      {mostraBenvinguda && (
        <ModalBenvinguda onClose={handleTancaBenvinguda} />
      )}

      {mostraDesbloqueig && (
        <ModalDesbloqueigTargetes
          targetes={idsTargetes.map(id => targetes.find(t => t.id === id)).filter(Boolean)}
          onClose={handleTancaDesbloqueig}
        />
      )}

      {mostraCapitolNou && (
        <ModalCapitolNou onClose={handleTancaOnBoarding} />
      )}




    </div>
  );
}

export default OnBoarding;
