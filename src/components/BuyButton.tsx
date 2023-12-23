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
  selectedItem: Item;
  setSelectedItem: Dispatch<SetStateAction<Item | undefined>>;
  currState: string;
  setCurrState: Dispatch<SetStateAction<string>>;
};
const BuyButton = ({
  selectedItem,
  setSelectedItem,
  currState,
  setCurrState,
}: CheckoutDisplayProps) => {
  const buttonBuyRef = useRef<HTMLDivElement>(null);

  const handleInputButtonClick = (input: string) => {
    // console.log(selectedItem);
    if (selectedItem) {
      // console.log("masuk Button");
      const nextState = getNextState(selectedItem, currState, input);
      // console.log(nextState);
      // console.log(currState);
      const output = getOutput(selectedItem, currState, input);
      // console.log(output);

      if (output !== "n") {
        console.log("hehey");
        if (output === "drink") {
          Swal.fire({
            title: "Item purchased",
            text: `Here's your ${selectedItem?.name}`,
            icon: "success",
            confirmButtonText: "Alright",
            confirmButtonColor: "#475569",
            background: "#1e293b",
            color: "white",
          });
          setSelectedItem(undefined);
        } else {
          Swal.fire({
            title: "Amount of money must be exact",
            text: `Here's your ${output} back`,
            icon: "error",
            confirmButtonText: "Alright",
            confirmButtonColor: "#475569",
            background: "#1e293b",
            color: "white",
          });
        }
      }

      // setOutput(output);
      setCurrState(nextState);
    }
  };

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
      <AnimatedButton
        onClick={() => handleInputButtonClick("buy")}
        text="Buy"
      />
    </div>
  );
};

export default BuyButton;
