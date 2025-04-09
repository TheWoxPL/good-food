import { useState, useEffect } from 'react';
import {
  Pizza,
  Croissant,
  Cookie,
  Citrus,
  Fish,
  Grape,
  Drumstick,
  Beef,
  Carrot,
  Cherry,
  Banana,
} from 'lucide-react';

const icons = [
  Pizza,
  Croissant,
  Cookie,
  Citrus,
  Fish,
  Grape,
  Drumstick,
  Beef,
  Carrot,
  Cherry,
  Banana,
];

export const Spinner = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(() =>
    Math.floor(Math.random() * icons.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex(() => Math.floor(Math.random() * icons.length));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = icons[currentIconIndex];

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        {/* Pulsing ring */}
        <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border-2 border-blue-300"></div>
        {/* Rotating SVG icons with enhanced scaling and fading effect */}
        <div className="absolute inset-0 flex justify-center items-center">
          <CurrentIcon className="animate-ping h-4 w-4 text-blue-500 animate-scale-fade-intense" />
        </div>
      </div>
    </div>
  );
};
