import { useEffect, useState } from "react";
import { useUbicacio } from "../../context/ubicacioContext";
import { useTargetes } from "../../context/targetesContext";
import ModalDesbloqueigVideo from "./modalDesbloqueigVideo";
import ModalDesbloqueigTargetes from "./modalDesbloqueigTargetes";

export default function ModalGlobal() {
  const { videoDetectat, acceptaDesbloqueig, desbloquejaUbicacio } = useUbicacio();
  const { getTargetaPerId } = useTargetes();

  const [targetesDesbloquejades, setTargetesDesbloquejades] = useState([]);
  const [mostraModalTargetes, setMostraModalTargetes] = useState(false);

  useEffect(() => {
    const justWatched = localStorage.getItem("videoWatched");

    if (justWatched) {
      const idVideo = parseInt(justWatched);

      desbloquejaUbicacio(idVideo); // opcional, si desbloqueja algo addicional
      const targeta = getTargetaPerId(idVideo);
      if (targeta) {
        setTargetesDesbloquejades([targeta]);
        setMostraModalTargetes(true);
      }

      localStorage.removeItem("videoWatched");
    }
  }, []);

  if (mostraModalTargetes) {
    return (
      <ModalDesbloqueigTargetes
        targetes={targetesDesbloquejades}
        onClose={() => setMostraModalTargetes(false)}
      />
    );
  }

  if (!videoDetectat) return null;

  return (
    <ModalDesbloqueigVideo
      video={videoDetectat}
      onClose={acceptaDesbloqueig}
    />
  );
}
