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
            const dist = calculaDistancia(
              latitude,
              longitude,
              video.ubicació.lat,
              video.ubicació.lng
            );
            if (dist < 0.05) {
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
