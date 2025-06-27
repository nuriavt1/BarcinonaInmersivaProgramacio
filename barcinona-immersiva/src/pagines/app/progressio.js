import FooterMenu from "../../components/footerMenu";
import CardVideo from "../../components/video/cardVideo";
import { useVideos } from '../../context/videoContext';
import { useMemo } from 'react';
import { useComprovaUbicacio } from "../../hooks/useComprovaUbicacio";

function Progressio() {
  const { videos, getVideosActius } = useVideos();
  const { comprovaUbicacio } = useComprovaUbicacio();

 // const videosActius = useMemo(() => getVideosActius(), [videos]);
 const videosTots = useMemo(() => videos, [videos]);


  return (
    <div>
      <p>Aquesta és la pàgina de Progrés</p>

      <p>VIDEOS ACTIVATS</p>

      {videosTots.map((video) => (
        <div key={video.idVideo}>
          <CardVideo
            id={video.idVideo}
            nom={video.titol}
            imatge={video.imatgeCaratula}
            url={video.url}
             estat={video.debloquejat ? (video.ubicacióDesbloquejada ? "desbloquejat" : "actiu") : "bloquejat"}
          />

          {!video.ubicacioDesbloquejada ? (
            <button onClick={() => comprovaUbicacio(video)}>
              Comprova ubicació
            </button>
          ) : (
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              Veure vídeo
            </a>
          )}
        </div>
      ))}

      <FooterMenu />
    </div>
  );
}

export default Progressio;
