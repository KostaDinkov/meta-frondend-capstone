import { createContext, useContext, useState } from "react";

const OverlayContext = createContext(null);

export default function OverlayProvider({ children }) {
  const [overlayState, setOverlayState] = useState({ isOpen: false });
  return (
    <OverlayContext.Provider value={{ overlayState, setOverlayState }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlayContext() {
  return useContext(OverlayContext);
}
