// src/components/Canvas.tsx
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux/Store';

import "./Canvas.css";
import { useDispatch } from 'react-redux';



const Canvas: React.FC=()=>{
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageUrl = "https://testvideosassets.blob.core.windows.net/input-image/0a799c26-12d5-4243-a1ef-157d2038f25c.jpg"

  useEffect(() => {
    if (canvasRef.current && imageUrl) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        if (ctx) {
          canvas.width = 500;
          canvas.height = 500;

          // Calculate aspect ratio
          const imgAspectRatio = img.width / img.height;
          const canvasAspectRatio = canvas.width / canvas.height;
          
          let drawWidth, drawHeight, drawX, drawY;
          
          if (imgAspectRatio > canvasAspectRatio) {
            // Image is wider than canvas
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspectRatio;
            drawX = 0;
            drawY = (canvas.height - drawHeight) / 2;
          } else {
            // Image is taller than canvas
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgAspectRatio;
            drawX = (canvas.width - drawWidth) / 2;
            drawY = 0;
          }
          // Draw the image scaled to fit within the canvas while maintaining aspect ratio
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        }
      };
      img.src = imageUrl;
    }
  }, [imageUrl]);

  return <canvas ref={canvasRef} />;
}

export default Canvas;