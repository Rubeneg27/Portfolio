import React, { createContext, useContext, useEffect, useState } from "react";

const DeviceContext = createContext();

export function useDevice() {
  return useContext(DeviceContext)
}

export function DeviceProvider({ children }) {
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para detectar si el dispositivo es móvil
    function checkIfMobile(e) {
      setIsMobile(e.matches);
      console.log(`movil: ${isMobile}`)
    }
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    checkIfMobile(mediaQuery);

    mediaQuery.addListener(checkIfMobile);

    return () => {
      mediaQuery.removeListener(checkIfMobile);
    };
  }, [isMobile]); 

  return (
    <DeviceContext.Provider value={{ isMobile }}>
      {children}
    </DeviceContext.Provider>
  )
}