import React, { useEffect, useRef } from "react";
import "../index.css";

const Congratulations = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const confettiColors = ["#fce18a", "#ff726d", "#b48def", "#f4306d"];
    const confettiAnimations = ["slow", "medium", "fast"];

    const createConfetti = () => {
      const confettiEl = document.createElement("div");
      const confettiSize = `${Math.floor(Math.random() * 3) + 7}px`;
      const confettiBackground = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const confettiLeft = `${Math.floor(Math.random() * el.offsetWidth)}px`;
      const confettiAnimation = confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];

      confettiEl.classList.add("confetti", `confetti--animation-${confettiAnimation}`);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      setTimeout(() => {
        confettiEl.remove();
      }, 3000);

      el.appendChild(confettiEl);
    };

    const confettiInterval = setInterval(createConfetti, 25);

    return () => clearInterval(confettiInterval);
  }, []);

  return <div ref={containerRef} className="confetti-container"></div>;
};

export default Congratulations;