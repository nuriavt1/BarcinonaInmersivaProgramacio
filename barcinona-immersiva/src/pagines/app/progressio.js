import FooterMenu from "../../components/footerMenu";
import CardVideo from "../../components/video/cardVideo";
import { useVideos } from '../../context/videoContext';
import { useMemo } from 'react';
import { useComprovaUbicacio } from "../../hooks/useComprovaUbicacio";
import style from "../../estils/progressio.module.css";

function Progressio() {
  const { videos, getVideosActius } = useVideos();
  const { comprovaUbicacio } = useComprovaUbicacio();

 // const videosActius = useMemo(() => getVideosActius(), [videos]);
 const videosTots = useMemo(() => videos, [videos]);


  return (
    <div className={style.body}>
<div className={style.content}>
<p className="headline2" style={{color: "var(--color-white)"}}>VÍDEOS</p>

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
</div>


      <FooterMenu />
    </div>
  );
}

export default Progressio;
