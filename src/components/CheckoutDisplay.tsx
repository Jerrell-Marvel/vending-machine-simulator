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
};

const stateValueMap: { [key: string]: number } = {
  S0: 0,
  S1: 1000,
  S2: 2000,
  S3: 3000,
  S4: 4000,
  S5: 5000,
  S6: 6000,
  S7: 7000,
  S8: 8000,
  S9: 9000,
  S10: 10000,
};

const nominal = ["1000", "2000", "5000", "10000"];

const CheckoutDisplay = ({
  selectedItem,
  setSelectedItem,
}: CheckoutDisplayProps) => {
  const [currState, setCurrState] = useState<string>("S0");

  const checkoutContainerRef = useRef<HTMLDivElement>(null);

  const handleInputButtonClick = (input: string) => {
    if (selectedItem) {
      const nextState = getNextState(selectedItem, currState, input);
      const output = getOutput(selectedItem, currState, input);

      if (output !== "n") {
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
    if (checkoutContainerRef.current) {
      checkoutContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return (
    <motion.div
      className="px-10 mt-6"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      id="checkout-display"
      ref={checkoutContainerRef}
    >
      <div className="flex flex-col text-center p text-2xl items-center font-medium sm:font-semibold rounded-lg px-4 py-4 gap-2">
        <p>{selectedItem.name}</p>
        <p>{selectedItem.price}</p>
      </div>
      {/* <div className="flex justify-center text-xl pt-10 font-medium">{selectedItem.price}</div> */}
      <div className="flex flex-col justify-center items-center">
        <div className="text-xl"> Current Balance : </div>
        <div className="text-lg">{stateValueMap[currState]}</div>
      </div>

      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        {nominal.map((nominal) => {
          return (
            <Button
              key={nominal}
              text={nominal}
              onClick={() => handleInputButtonClick(nominal)}
            />
          );
        })}
      </div>

      {stateValueMap[currState] < selectedItem.price ? null : (
        <div className="flex justify-center mt-6">
          <AnimatedButton
            onClick={() => handleInputButtonClick("buy")}
            text="Buy"
          />
        </div>
      )}

      {currState === "S0" ? (
        <div className="flex justify-center mt-6">
          <AnimatedButton
            onClick={() => setSelectedItem(undefined)}
            text="Cancel Transaction"
          />
        </div>
      ) : null}
    </motion.div>
  );
};

export default CheckoutDisplay;
