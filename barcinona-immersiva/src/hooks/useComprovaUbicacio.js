// hooks/useComprovaUbicacio.js
import { useVideos } from "../context/videoContext.js";
import { calculaDistancia } from "../utils/geo.js";

export function useComprovaUbicacio() {
  const { desbloquejaUbicacio } = useVideos();

  const comprovaUbicacio = (video) => {
    if (!navigator.geolocation) {
      alert("Geolocalització no suportada.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

  console.log("Coordenades usuari:");
        console.log("Lat:", latitude);
        console.log("Lng:", longitude);

        const destLat = video.ubicació?.lat;
        const destLng = video.ubicació?.lng;

        if (destLat == null || destLng == null) {
          alert("Aquest vídeo no té coordenades definides.");
          return;
        }

        const dist = calculaDistancia(latitude, longitude, destLat, destLng);

        if (dist < 0.1) {
          desbloquejaUbicacio(video.idVideo);
          alert("Ubicació verificada! Ara pots veure el vídeo.");
        } else {
          alert(`Estàs a ${Math.round(dist * 1000)} metres. Apropa't més!`);
        }
      },
      () => alert("No s'ha pogut obtenir la teva ubicació.")
    );
  };

  return { comprovaUbicacio };
}
