// context/videoContext.js
import { createContext, useContext, useEffect, useState } from "react";
import videosData from "../data/videos.json";

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  // Inicialització segura: llegeix del localStorage o usa el fitxer
  const [videos, setVideos] = useState(() => {
    const stored = localStorage.getItem("videos");
    return stored ? JSON.parse(stored) : videosData;
  });

  // Guarda al localStorage quan canvien els vídeos
  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  // Funcions per desbloquejar
  const desbloquejaVideo = (id) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.idVideo === id ? { ...v, debloquejat: true } : v
      )
    );
  };

  const desbloquejaUbicacio = (id) => {
    setVideos((prev) =>
      prev.map((v) =>
        v.idVideo === id ? { ...v, ubicacióDesbloquejada: true } : v
      )
    );
  };

  const getVideoPerId = (id) => videos.find((v) => v.idVideo === id);
  
  // Retorna només els vídeos desbloquejats
const getVideosActius = () => videos.filter(v => v.debloquejat);


  return (
    <VideosContext.Provider
      value={{
        videos,
        desbloquejaVideo,
        desbloquejaUbicacio,
        getVideoPerId,
        getVideosActius,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => useContext(VideosContext);
