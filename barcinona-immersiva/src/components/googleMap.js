import React, { useEffect, useRef, useState } from 'react';
import markersData from "../data/markersMapa.json";
import { useNivell } from "../context/nivellContext";

export default function GoogleMap() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapa, setMapa] = useState(null);
  const [rotacio, setRotacio] = useState(0);
  const { nivell } = useNivell();

  const API_KEY = 'AIzaSyDjd6_cWoVzsLayPAa9rZpOjd6jB9l2H1w';

  const loadScript = (url) => {
    return new Promise((resolve) => {
      if (!document.querySelector(`script[src="${url}"]`)) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      } else {
        resolve();
      }
    });
  };

  useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null) setRotacio(event.alpha);
    };

    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      DeviceOrientationEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener("deviceorientationabsolute", handleOrientation, true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    }

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation);
    };
  }, []);

  useEffect(() => {
    const initMap = async () => {
      const url = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&v=beta`;
      await loadScript(url);
      if (!window.google) return;

      const { AdvancedMarkerView } = await window.google.maps.importLibrary("marker");

      const defaultLatLng = { lat: 41.3839, lng: 2.1775 };
      const map = new window.google.maps.Map(mapRef.current, {
        center: defaultLatLng,
        zoom: 16,
        mapId: '1575ba43ccf543cf',
        disableDefaultUI: true,
      });

      setMapa(map);

      // 🔵 Marcador de l’usuari
      const markerDiv = document.createElement("div");
      markerDiv.style.width = "40px";
      markerDiv.style.height = "40px";
      markerDiv.innerHTML = `
        <div style="width: 40px; height: 40px; transform: rotate(${rotacio}deg);">
          <img src="/imatgesMaps/PositionMarker.svg" style="width: 100%; height: 100%;" />
        </div>
      `;
      markerRef.current = new AdvancedMarkerView({
        map,
        position: defaultLatLng,
        content: markerDiv,
      });

      // 📍 Marcadors filtrats pel nivell actual
      markersData
        .filter(marker => marker.cap === nivell)
        .forEach(marker => {
          const markerElement = document.createElement("div");
          markerElement.style.width = "36px";
          markerElement.style.height = "36px";
          const imgSrc = marker.nom.toLowerCase().includes("plaça") ? "enigmaMarker.svg" : "videoMarker.svg";
          markerElement.innerHTML = `
            <img src="/imatgesMaps/${imgSrc}" style="width: 100%; height: 100%;" />
          `;
          new AdvancedMarkerView({
            map,
            position: { lat: marker.lat, lng: marker.lng },
            title: marker.nom,
            content: markerElement,
          });
        });
    };

    initMap();
  }, [nivell]);

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
