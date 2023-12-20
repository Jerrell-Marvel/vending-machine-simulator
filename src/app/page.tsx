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
    <main className="w-full">
      <div>
        {selectedItem ? (
          <div>
            {currState == "S0" ? (
              <button
                onClick={() => {
                  setSelectedItem(undefined);
                }}
              >
                back
              </button>
            ) : null}

            <div>{selectedItem.name}</div>
            <div>{selectedItem.price}</div>

            <div className="flex gap-6">
              {nominal.map((nominal) => {
                return (
                  <button
                    key={nominal}
                    className="bg-slate-200 p-4"
                    onClick={() => handleInputButtonClick(nominal)}
                  >
                    {nominal}
                  </button>
                );
              })}

              {stateValueMap[currState] < selectedItem.price ? null : (
                <button
                  className="bg-slate-200 p-4"
                  onClick={() => {
                    handleInputButtonClick("buy");
                    setSelectedItem(undefined);
                  }}
                >
                  buy
                </button>
              )}
            </div>

            <div>curr duit : {stateValueMap[currState]}</div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 bg-red-50">
            {items.map((item) => {
              return (
                <div
                  key={item.name}
                  className="w-28 h-28 flex flex-col justify-center items-center bg-yellow-300 px-6 py-4 cursor-pointer"
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                >
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div>Output : {output}</div>
    </main>
  );
}
