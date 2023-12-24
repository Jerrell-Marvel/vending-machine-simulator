import { Item } from "@/types/item";
import { motion } from "framer-motion";
import Image from "next/image";

type CardProps = {
  item: Item;
  onClick: () => void;
};

const cardItemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
};

const Card = ({ item, onClick }: CardProps) => {
  return (
    <motion.div
      key={item.name}
      className={"w-full bg-slate-800 rounded-lg flex flex-col overflow-hidden cursor-pointer hover:scale-95 duration-300 text-xl text-center"}
      onClick={() => {
        // handleItemButtonClick(item);
        onClick();
      }}
      whileHover={{ scale: 0.95 }}
      variants={cardItemVariants}
    >
      <div className="px-3 py-4">{item.name}</div>
      <div className="w-full aspect-square relative">
        <Image
          src={`/${item.name}.jpeg`}
          alt={item.name}
          className="rounded-lg"
          width={300}
          height={300}
        ></Image>
      </div>

      <div className="px-3 py-4">{item.price}</div>
    </motion.div>
  );
};

export default Card;
