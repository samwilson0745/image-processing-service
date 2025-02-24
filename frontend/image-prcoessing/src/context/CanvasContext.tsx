// CanvasContext.tsx
import React from 'react';

export interface CanvasContextType {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;
}

// Here, we default to an empty canvas element instead of null
export const CanvasContext = React.createContext<CanvasContextType>({
  canvasRef: { current: document.createElement('canvas') as HTMLCanvasElement }
});