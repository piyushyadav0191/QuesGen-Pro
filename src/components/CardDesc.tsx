"use client";
import React from "react";
import Typed from "typed.js";

function CardDesc() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["  Welcome to QuesGen Pro!"],
      typeSpeed: 50,
      loop: true,
    });
  }, []);

  return (
    <span className="text-gray-800 dark:text-gray-300 underline" ref={el} />
  );
}

export default CardDesc;
