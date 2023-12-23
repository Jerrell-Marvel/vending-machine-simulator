import { Item } from "@/types/item";
import {
  AnimatePresence,
  ForwardRefComponent,
  HTMLMotionProps,
  motion,
} from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import Swal from "sweetalert2";
import { getNextState, getOutput } from "@/utils/states";
import AnimatedButton from "./AnimatedButton";

type CheckoutDisplayProps = {
  onClick: () => void;
};
const BuyButton = ({ onClick }: CheckoutDisplayProps) => {
  const buttonBuyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonBuyRef.current) {
      // console.log("masuk");
      buttonBuyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [buttonBuyRef]);

  return (
    <div className="flex justify-center mt-6" ref={buttonBuyRef}>
      <AnimatedButton onClick={() => onClick()} text="Buy" />
    </div>
  );
};

export default BuyButton;
