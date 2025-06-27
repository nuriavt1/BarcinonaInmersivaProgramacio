import { createContext, useContext, useState } from "react";

const NivellContext = createContext();

export function NivellProvider({ children }) {

    //Comencem a nivell 1.
  const [nivell, setNivell] = useState(1);
  //quí guardem els videos desbloquejats.
  const [videosDesbloquejats, setVideosDesbloquejats] = useState([]);
  //Aquí guardem les endevinalles resoltes.
  const [endevinallesResoltes, setEndevinallesResoltes] = useState([]);

  //Aquesta funció guarda la endevinalla a endevinalles resoltes
  const resolEndevinalla = (nivellId) => {
    if (!endevinallesResoltes.includes(nivellId)) {
      setEndevinallesResoltes((prev) => [...prev, nivellId]);
    }
  };

  //Aquesa funció guarda el video a video desbloquejat.
  const desbloquejaVideo = (videoId) => {
    if (!videosDesbloquejats.includes(videoId)) {
      setVideosDesbloquejats((prev) => [...prev, videoId]);
    }
  };

  
  const esEndevinallaResoluta = (nivellId) =>
    endevinallesResoltes.includes(nivellId);

  const esVideoDesbloquejat = (videoId) =>
    videosDesbloquejats.includes(videoId);

  return (
    <NivellContext.Provider
      value={{
        nivell,
        setNivell,
        resolEndevinalla,
        desbloquejaVideo,
        esEndevinallaResoluta,
        esVideoDesbloquejat,
      }}
    >
      {children}
    </NivellContext.Provider>
  );
}

export function useNivell() {
  return useContext(NivellContext);
}
