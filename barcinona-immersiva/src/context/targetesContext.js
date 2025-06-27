// context/targetesContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import data from "../data/targetes.json";

// Creem el context
const TargetesContext = createContext();

// Funció per obtenir totes les targetes amb debloquejat false per defecte
const generaTargetesInicials = () => [
  ...data.personatges,
  ...data.conceptes,
  ...data.localitzacions
].map(t => ({ ...t, debloquejat: false }));

//Definim el component provider que embolcalla l'aplicació i proporciona accés al context.
export const TargetesProvider = ({ children }) => {
  const [targetes, setTargetes] = useState([]);
  const [carregat, setCarregat] = useState(false); // Evita reinicialització

  // Només inicialitzar un cop per llegir largetes del local storage. Si no hi ha, genera les inicials i les desa. Si hi ha error, també es regeneren.
  useEffect(() => {
    if (carregat) return;

    try {
      const stored = localStorage.getItem("targetes");
      if (stored) {
        setTargetes(JSON.parse(stored));
      } else {
        const inicials = generaTargetesInicials();
        setTargetes(inicials);
        localStorage.setItem("targetes", JSON.stringify(inicials));
      }
    } catch (error) {
      console.error("Error llegint targetes del localStorage:", error);
      const inicials = generaTargetesInicials();
      setTargetes(inicials);
      localStorage.setItem("targetes", JSON.stringify(inicials));
    }

    setCarregat(true); // Marca que ja hem carregat un cop
  }, [carregat]);

  // Guarda canvis al localStorage quan canvien les targetes. Es desa l'estat actualitzat al localStorage.
  useEffect(() => {
    if (carregat) {
      localStorage.setItem("targetes", JSON.stringify(targetes));
      console.log("📦 Targetes actualitzades:", targetes);
    }
  }, [targetes, carregat]);

  // Funcions útils

  //Desbloqueja una targeta amb un id concret.
 /* const desbloquejaTargeta = (id) => {
    const noves = targetes.map(t =>
      t.id == id ? { ...t, debloquejat: true } : t
    );
    setTargetes(noves);
  };*/

  const desbloquejaTargeta = (id) => {
  setTargetes(prev =>
    prev.map(t =>
      t.id == id ? { ...t, debloquejat: true } : t
    )
  );
};


  //Retorna totes les targetes desbloquejades.
  const getTargetesDesbloquejades = () =>
    targetes.filter(t => t.debloquejat);

  //Cerca una targeta per id.
  const getTargetaPerId = (id) =>
    targetes.find(t => t.id == id);

  //Comprova si hi ha alguna targeta desbloquejada.
  const hiHaDesbloquejades = () =>
    targetes.some(t => t.debloquejat);

  //Reinicia totes les targetes a bloquejades
  const resetTargetes = () => {
    if (window.confirm("Segur que vols reiniciar totes les targetes?")) {
      const reset = targetes.map(t => ({ ...t, debloquejat: false }));
      setTargetes(reset);
    }
  };

  //Totes les funcions i dades es fan accessibles als components que usin aquest context.
  return (
    <TargetesContext.Provider
      value={{
        targetes,
        desbloquejaTargeta,
        getTargetesDesbloquejades,
        getTargetaPerId,
        hiHaDesbloquejades,
        resetTargetes
      }}
    >
      {children}
    </TargetesContext.Provider>
  );
};

export const useTargetes = () => useContext(TargetesContext); //Hook personalitzat que facilita l'us del context en altres components.
