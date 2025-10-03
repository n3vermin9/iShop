import React, { useEffect, useState } from "react";
import arrowUp from "./ArrowUp";

function ScrollUp() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!isAtTop && (
        <button
          onClick={handleScrollUp}
          className="w-14 h-14 border-2 border-zinc-300 shadow-zinc-400 shadow-lg fixed bottom-4 right-4 rounded-full flex items-center justify-center bg-white"
        >
          {arrowUp}
        </button>
      )}
    </>
  );
}

export default ScrollUp;
