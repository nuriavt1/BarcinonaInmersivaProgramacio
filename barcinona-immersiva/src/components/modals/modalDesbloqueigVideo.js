import { useEffect, useState } from "react";
import { useVideos } from "../../context/videoContext";
import { useUbicacio } from "../../context/ubicacioContext";
import styles from "../../estils/modal.module.css";
import VideoModalCard from "../video/videoModalCard";
import ButtonText from "../botons/buttonText";
import { useNivell } from "../../context/nivellContext";
import ModalDesbloqueigTargetes from "./modalDesbloqueigTargetes";
import ModalCapitolNou from "./modalCapitolNou";
import { useTargetes } from "../../context/targetesContext";

export default function ModalDesbloqueigVideo({ video, onClose }) {
  const { desbloquejaVideo } = useVideos();
  const { desbloquejaUbicacioSenseTancar } = useUbicacio();
  const { nivell, setNivell } = useNivell();
  //Estat per mostrar el modal de desbloquejar targetes.
  const [mostraModalDesbloqueigTargetes, setMostraModalDesbloqueigTargetes] = useState(false);
  const [mostraModalCapitolNou, setMostraModalCapitolNou] = useState(false);
  const { targetes } = useTargetes();

  //Funció per desbloquejar targetes.
  const { desbloquejaTargeta } = useTargetes();
  const idsTargetes = video.targetesDesbloquejades || [];
  useEffect(() => {
    console.log("Nivell actualitzat:", nivell);
  }, [nivell]);

  const handleDesbloqueig = () => {
    if (video?.url) {
      window.open(video.url, "_blank");
    }

    setNivell(nivell + 1);
    setMostraModalDesbloqueigTargetes(true);
  };


  const handleTancaDesbloqueig = () => {
    idsTargetes.forEach(id => {
      desbloquejaTargeta(id);
    });

    setMostraModalDesbloqueigTargetes(false);
    setMostraModalCapitolNou(true);
 //    onClose();
  };

  const handleTancaCapitolNou = () => {
    setMostraModalCapitolNou(false);
    onClose();
  };


  const desbloquejat = video.debloquejat && video.ubicacióDesbloquejada;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}
       style={{
    display: (mostraModalDesbloqueigTargetes || mostraModalCapitolNou) ? "none" : "block"
  }}
      >
        <h3>NOU VIDEO DESBLOQUEJAT! {video.titol}</h3>
        <p>Reprodueix el vídeo per continuar amb la història</p>

        <VideoModalCard
          imatge={video.imatgeCaratula}
          nom={video.titol}
          url={video.url}
          estat={video.debloquejat}
        />
        <ButtonText onClick={handleDesbloqueig}>
          <p>Reprodueix vídeo</p>
        </ButtonText>
      </div>

      {mostraModalDesbloqueigTargetes && (
        <ModalDesbloqueigTargetes
          targetes={idsTargetes.map(id => targetes.find(t => t.id === id)).filter(Boolean)}
          onClose={handleTancaDesbloqueig}
        />
      )}

      {mostraModalCapitolNou && (
        <ModalCapitolNou
          onClose={handleTancaCapitolNou}
        />
      )}


    </div>
  );
}
