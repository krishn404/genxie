'use client';
import React, { useRef, useState } from 'react';

const InputSpotlightBorder = () => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0} // This makes the div focusable
        className="relative w-64 h-12 border border-gray-300 rounded-md"
      >
        {/* Spotlight effect */}
        <div
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x,
            transform: 'translate(-50%, -50%)',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.5)',
            opacity: opacity,
            pointerEvents: 'none',
            transition: 'opacity 0.2s ease',
          }}
        />
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none px-3"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
};

export default InputSpotlightBorder;
