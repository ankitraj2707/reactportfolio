import { useState, useEffect } from "react";

export const useWebGLSupport = () => {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      setIsSupported(Boolean(gl && gl instanceof WebGLRenderingContext));
    } catch {
      setIsSupported(false);
    }
  }, []);

  return isSupported;
};
