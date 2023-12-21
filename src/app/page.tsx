"use client";
import { getNextState, getOutput } from "@/utils/states";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";

export type Item = {
  name: string;
  price: number;
};

const items: Item[] = [
  { name: "Nipis Madu", price: 4000 },
  { name: "Le Minerale", price: 5000 },
  { name: "Kopiko", price: 6000 },
  { name: "Tujuh Kurma", price: 10000 },
];

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

const containerVariants = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const buttonVariants = {
  hidden: {
    y: 25,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },

  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  const [currState, setCurrState] = useState<string>("S0");

  const [output, setOutput] = useState("n");

  useEffect(() => {
    if (output !== "n") {
      console.log(output);
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
  }, [output]);

  const handleInputButtonClick = (input: string) => {
    if (selectedItem) {
      const nextState = getNextState(selectedItem, currState, input);
      const output = getOutput(selectedItem, currState, input);

      setOutput(output);
      setCurrState(nextState);
    }
  };

  const handleItemButtonClick = (item: Item) => {
    if (!selectedItem) {
      setSelectedItem(item);
    } else {
      Swal.fire({
        title: "Transaction cannot be processed",
        text: `Please complete the ongoing transaction first`,
        icon: "error",
        confirmButtonText: "Alright",
        confirmButtonColor: "#475569",
        background: "#1e293b",
        color: "white",
      });
    }
  };

  return (
    <main className="flex justify-center bg-slate-950 min-h-screen text-white py-16 px-8">
      <div className="w-full max-w-5xl">
        <motion.div
          className="flex justify-center font-medium text-2xl
            px-6 py-10 items-center bg-slate-800 rounded-lg text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Lorem, ipsum dolor.
        </motion.div>

        <motion.div
          className="justify-center gap-3 text-white mt-6 rounded-lg grid grid-cols-2 md:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((item) => {
            return (
              <motion.div
                key={item.name}
                className={
                  "w-full bg-slate-800 rounded-lg flex flex-col overflow-hidden cursor-pointer hover:scale-95 duration-300 text-xl"
                }
                onClick={() => {
                  handleItemButtonClick(item);
                }}
                whileHover={{ scale: 0.95 }}
                variants={itemVariants}
              >
                <div className="px-3 py-4">{item.name}</div>
                <Image
                  src={`/${item.name}.png`}
                  width={400}
                  height={300}
                  alt={item.name}
                  className="w-full rounded-t-lg h-[188px]"
                ></Image>

                <div className="px-3 py-4">{item.price}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {selectedItem ? (
            <motion.div
              className="rounded-md px-6 py-5"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col text-center p text-2xl items-center font-medium sm:font-semibold rounded-lg px-4 py-4 gap-2">
                <p>{selectedItem.name}</p>
                <p>{selectedItem.price}</p>
              </div>
              {/* <div className="flex justify-center text-xl pt-10 font-medium">{selectedItem.price}</div> */}
              <div className="flex flex-col justify-center items-center mt-6">
                <div className="text-xl"> Current Balance : </div>
                <div className="text-lg">{stateValueMap[currState]}</div>
              </div>

              <div className="flex justify-center gap-3 sm:gap-4 mt-6">
                {nominal.map((nominal) => {
                  return (
                    <button
                      key={nominal}
                      className="btn-small sm:btn"
                      onClick={() => handleInputButtonClick(nominal)}
                    >
                      {nominal}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center mt-6">
                <AnimatePresence>
                  {stateValueMap[currState] < selectedItem.price ? null : (
                    <motion.button
                      className="btn mr-3"
                      onClick={() => {
                        handleInputButtonClick("buy");
                        // setOutput(selectedItem.name);
                        // setSelectedItem(undefined);
                      }}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={buttonVariants}
                    >
                      Buy
                    </motion.button>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {currState === "S0" ? (
                    <motion.button
                      onClick={() => {
                        setSelectedItem(undefined);
                      }}
                      className="btn-small sm:btn mr-3"
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      variants={buttonVariants}
                    >
                      Cancel transaction
                    </motion.button>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
