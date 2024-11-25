'use client';
import React, { useRef, useState, useEffect } from 'react';

const CardSpotlight = () => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1); // Set initial opacity to 1
  const [translateY, setTranslateY] = useState(0); // Set initial translate Y position to 0
  const [texts, setTexts] = useState([
    "Give prompts to generate documents",
    "Get results in seconds",
    "Edit the results",
  ]); // Added state for multiple texts

  const [currentTextIndex, setCurrentTextIndex] = useState(0); // Track the current text index
  const [textVisible, setTextVisible] = useState(true); // Track text visibility

  // New effect to change text periodically with fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false); // Start fading out
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Update text after fade out
        setTextVisible(true); // Fade back in
      }, 500); // Fade out duration (same as transition time)
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

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
    setOpacity(1); // Keep text visible on hover
    setTranslateY(0); // Slide up
  };

  const handleMouseLeave = () => {
    setOpacity(1); // Keep text visible when not hovering
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
        className={`text-2xl text-gray-200 transform transition-all duration-300 ease-in-out opacity-${opacity} translate-y-${translateY} ${
          textVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transition: 'opacity 0.5s ease-in-out' }} // Smooth fade in and fade out
      >
        {texts[currentTextIndex]} {/* Updated to display current text */}
      </p>
    </div>
  );
};

export default CardSpotlight;
