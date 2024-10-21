'use client';
import React, { useRef, useState } from 'react';

const CardSpotlight = () => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(20); // Initial translate Y position

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
    setTranslateY(0); // Slide up
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
    setTranslateY(20); // Slide down
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setTranslateY(0); // Slide up
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setTranslateY(20); // Slide down
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className='relative flex w-full h-[500px] items-center justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-r from-black to-gray-950 px-8 py-16 shadow-2xl'
    >
      <div
        className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
        }}
      />
      <p
        className={`text-sm text-gray-200 transform transition-all duration-300 ease-in-out opacity-${opacity} translate-y-${translateY}`}
      >
        To be updated....
      </p>
    </div>
  );
};

export default CardSpotlight;
