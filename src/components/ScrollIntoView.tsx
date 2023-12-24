import { useEffect, useRef } from "react";

const ScrollIntoView = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [scrollRef]);

  return (
    <div
      ref={scrollRef}
      style={{ visibility: "hidden" }}
    ></div>
  );
};

export default ScrollIntoView;
