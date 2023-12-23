import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

type ScrollIntoViewType = {
  children?: ReactNode;
};
const ScrollIntoView = ({ children }: ScrollIntoViewType) => {
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

  return <div ref={scrollRef}>{children}</div>;
};

export default ScrollIntoView;
