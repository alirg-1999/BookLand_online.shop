import React, { useState, useEffect, useCallback } from "react";

const Use_Scroll_Num = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollPosition;
};

export default Use_Scroll_Num;
