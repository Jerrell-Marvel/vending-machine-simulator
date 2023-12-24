import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

const ScrollIntoView = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // console.log("masuk");
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollRef]);

  return <div ref={scrollRef} style={{ visibility: "hidden" }}></div>;
};

export default ScrollIntoView;
