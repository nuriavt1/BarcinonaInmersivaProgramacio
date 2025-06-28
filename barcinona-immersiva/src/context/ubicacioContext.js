import { createContext, useContext, useEffect, useState } from "react";
import { calculaDistancia } from "../utils/geo";
import { useVideos } from "./videoContext";

const UbicacioContext = createContext();

export const UbicacioProvider = ({ children }) => {
  const { videos, desbloquejaUbicacio } = useVideos();
  const [videoDetectat, setVideoDetectat] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
            console.log("📍 Posició actual:", latitude, longitude);

        for (let video of videos) {
          if (
            video.debloquejat &&
            !video.ubicacióDesbloquejada &&
            video.ubicació?.lat != null &&
            video.ubicació?.lng != null
          ) {

             console.log(`📍 Comparant amb video: ${video.titol}`);
    console.log(`   🧭 Posició actual:     ${latitude}, ${longitude}`);
    console.log(`   🎯 Ubicació del vídeo: ${video.ubicació.lat}, ${video.ubicació.lng}`);

            const dist = calculaDistancia(
              latitude,
              longitude,
              video.ubicació.lat,
              video.ubicació.lng
            );
              console.log(`📏 Distància fins a "${video.titol}": ${dist} km`);
            if (dist < 0.05) {
                 console.log(`🎯 Estàs dins del radi! Desbloquejant: ${video.titol}`);
              setVideoDetectat(video);
              break;
            }
          }
        }
      },
      (err) => console.error("Error amb la ubicació:", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [videos]);

  const acceptaDesbloqueig = () => {
    if (videoDetectat) {
      desbloquejaUbicacio(videoDetectat.idVideo);
      setVideoDetectat(null);
    }
  };

  const desbloquejaUbicacioSenseTancar = () => {
  if (videoDetectat) {
    desbloquejaUbicacio(videoDetectat.idVideo);
  }
};


  const cancelDesbloqueig = () => setVideoDetectat(null);

  return (
    <UbicacioContext.Provider
      value={{ videoDetectat, acceptaDesbloqueig, cancelDesbloqueig, desbloquejaUbicacioSenseTancar }}
    >
      {children}
    </UbicacioContext.Provider>
  );
};

export const useUbicacio = () => useContext(UbicacioContext);
