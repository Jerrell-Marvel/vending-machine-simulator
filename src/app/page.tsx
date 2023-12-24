"use client";
import { getNextState, getOutput } from "@/utils/states";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";
import { Item } from "@/types/item";
import Card from "@/components/Card";
import CheckoutDisplay from "@/components/CheckoutDisplay";

// export type Item = {
//   name: string;
//   price: number;
// };

const items: Item[] = [
  { name: "Nipis Madu", price: 4000 },
  { name: "Le Minerale", price: 5000 },
  { name: "Kopiko", price: 6000 },
  { name: "Tujuh Kurma", price: 10000 },
];

const containerVariants = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

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
    <main className="flex justify-center bg-slate-950 min-h-screen text-white py-8 px-8">
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
              <Card
                key={item.name}
                item={item}
                onClick={() => handleItemButtonClick(item)}
              />
            );
          })}
        </motion.div>

        <AnimatePresence>
          {selectedItem ? (
            <CheckoutDisplay
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
