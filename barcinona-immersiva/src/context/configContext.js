import { createContext, useContext, useEffect, useState } from "react";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("config");
    if (stored) {
      const parsed = JSON.parse(stored);
      setIsFirstTime(parsed.isFirstTime === false ? false : true); // fallback true
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      "config",
      JSON.stringify({ isFirstTime })
    );
  }, [isFirstTime, loaded]);

  return (
    <ConfigContext.Provider value={{ isFirstTime, setIsFirstTime }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
