import React, { useEffect, useRef, useState } from 'react';

export default function GoogleMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapa, setMapa] = useState(null);
  const [rotacio, setRotacio] = useState(0);

  const API_KEY = 'AIzaSyDjd6_cWoVzsLayPAa9rZpOjd6jB9l2H1w';

  const loadScript = (url) => {
    return new Promise((resolve) => {
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        script.onload = () => resolve();
      } else {
        resolve();
      }
    });
  };

useEffect(() => {
  const handleOrientation = (event) => {
    const alpha = event.alpha;
    if (alpha !== null) {
      setRotacio(alpha);
    }
  };

  // 👇 Comprovem si cal demanar permís (iOS)
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((response) => {
        if (response === 'granted') {
          window.addEventListener("deviceorientationabsolute", handleOrientation, true);
        } else {
          console.warn("Permís per accedir a l'orientació denegat");
        }
      })
      .catch(console.error);
  } else {
    // Altres dispositius que no necessiten permís
    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
  }

  return () => {
    window.removeEventListener("deviceorientationabsolute", handleOrientation);
  };
}, []);


  useEffect(() => {
    const getUbicacioGoogle = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
          method: 'POST'
        });

        if (!res.ok) throw new Error("No s'ha pogut obtenir la ubicació");

        const data = await res.json();
        return {
          lat: data.location.lat,
          lng: data.location.lng
        };
      } catch (err) {
        console.error("❌ Error amb la geolocalització de Google:", err);
        return null;
      }
    };

    const initMap = async () => {
      if (window.google) {
        const ubicacioInicial = await getUbicacioGoogle();
        const myLatLng = ubicacioInicial || { lat: 41.3839, lng: 2.1775 };

        const map = new window.google.maps.Map(mapRef.current, {
          center: myLatLng,
          zoom: 16,
          mapId: '1575ba43ccf543cf',
          disableDefaultUI: true,
        });

        setMapa(map);

        const { AdvancedMarkerView } = await window.google.maps.importLibrary("marker");
        if (!AdvancedMarkerView) {
          console.error("❌ No s'ha pogut carregar AdvancedMarkerView");
          return;
        }

        const markerDiv = document.createElement("div");
        markerDiv.style.width = "40px";
        markerDiv.style.height = "40px";
        markerDiv.innerHTML = `
          <div style="width: 40px; height: 40px; transform: rotate(${rotacio}deg);">
            <img src="/imatgesMaps/PositionMarker.svg" style="width: 100%; height: 100%;" />
          </div>
        `;

        const marker = new AdvancedMarkerView({
          map,
          position: myLatLng,
          content: markerDiv,
        });

        markerRef.current = marker;
      }
    };

    const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&v=beta`;
    loadScript(url).then(initMap);
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      const div = markerRef.current.content.querySelector('div');
      if (div) {
        div.style.transform = `rotate(${rotacio}deg)`;
      }
    }
  }, [rotacio]);

  return (
    <div>
      <div ref={mapRef} style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}
