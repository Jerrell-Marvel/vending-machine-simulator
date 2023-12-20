"use client";
import { getNextState, getOutput } from "@/utils/states";
import Image from "next/image";
import { useState } from "react";

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
  S10: 100000,
};

const nominal = ["1000", "2000", "5000", "10000"];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  const [currState, setCurrState] = useState<string>("S0");

  const [output, setOutput] = useState("n");

  const handleInputButtonClick = (input: string) => {
    if (selectedItem) {
      const nextState = getNextState(selectedItem, currState, input);
      const output = getOutput(selectedItem, currState, input);

      setOutput(output);
      setCurrState(nextState);
    }
  };

  return (
    <main className="flex justify-center bg-slate-900 min-h-screen text-white">
      <div className="max-w-[768px] bg-slate-800">
        <div>
          {selectedItem ? (
            <div>
              <div className="flex justify-center text-2xl sm:text-3xl bg-slate-700  h-20 sm:h-24 items-center font-medium sm:font-semibold ">
                {selectedItem.name}
              </div>
              <div className="flex justify-center text-xl pt-10 font-medium">
                {selectedItem.price}
              </div>

              <div className="flex gap-3 sm:gap-6 py-10 px-5">
                {nominal.map((nominal) => {
                  return (
                    <button
                      key={nominal}
                      className="bg-slate-600 p-4"
                      onClick={() => handleInputButtonClick(nominal)}
                    >
                      {nominal}
                    </button>
                  );
                })}
              </div>

              <div className="py-10 flex flex-col justify-center items-center">
                <div className="text-xl"> current money : </div>
                <div className="text-lg">{stateValueMap[currState]}</div>
              </div>

              <div className="flex justify-center">
                {stateValueMap[currState] < selectedItem.price ? null : (
                  <button
                    className="bg-slate-500 p-2 px-3 text-lg rounded-md"
                    onClick={() => {
                      handleInputButtonClick("buy");
                      setOutput(selectedItem.name);
                      setSelectedItem(undefined);
                    }}
                  >
                    buy
                  </button>
                )}
              </div>

              {currState === "S0" ? (
                <div className=" flex justify-center">
                  <button
                    onClick={() => {
                      setSelectedItem(undefined);
                    }}
                    className="bg-slate-600 p-2 rounded-md"
                  >
                    Return
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              <div
                className="flex justify-center font-medium text-2xl
              p-20 items-center"
              >
                Choose your Product!
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-white">
                {items.map((item) => {
                  return (
                    <>
                      <div className="flex-col  bg-slate-600 border-2 cursor-pointer">
                        <button
                          key={item.name}
                          className="w-22 sm:w-28 h-22 sm:h-28 flex flex-col text-lg justify-center items-center px-6 py-4 "
                          onClick={() => {
                            setOutput("n");
                            setSelectedItem(item);
                          }}
                        >
                          {item.name}
                        </button>

                        <p className="text-center text-sm bg-slate-950">
                          {item.price}
                        </p>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>
        <div>
          {output != "n" ? (
            currState != "S0" ? (
              <div className="flex justify-center pt-10 cursor-default">
                Output : {output}
              </div>
            ) : (
              <div className="pt-20">
                <div className="flex flex-col items-center justify-center  text-xl font-bold cursor-default">
                  Enjoy Your {output} !
                  <img
                    src="nipis madu png.png"
                    alt=""
                    className="h-48 w-48 mt-4 cursor-pointer"
                    onClick={() => {
                      setOutput("n");
                    }}
                  />
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </main>
  );
}
