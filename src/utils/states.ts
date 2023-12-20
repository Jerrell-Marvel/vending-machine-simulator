import { Item } from "@/app/page";

const stateMap: { [key: string]: number } = {
  S0: 0,
  S1: 1,
  S2: 2,
  S3: 3,
  S4: 4,
  S5: 5,
  S6: 6,
  S7: 7,
  S8: 8,
  S9: 9,
  S10: 10,
};

const inputMap: { [key: string]: number } = {
  1000: 0,
  2000: 1,
  5000: 2,
  10000: 3,
  buy: 4,
};

type ItemFSMMap = {
  [key: number]: {
    // [key: string]: string[][];
    fsmState: string[][];
    fsmOutput: string[][];
  };
};

const itemFSMMap: ItemFSMMap = {
  4000: {
    fsmState: [
      ["S1", "S2", "S0", "S0", "S0"],
      ["S2", "S3", "S1", "S1", "S1"],
      ["S3", "S4", "S2", "S2", "S2"],
      ["S4", "S3", "S3", "S3", "S3"],
      ["S4", "S4", "S4", "S4", "S0"],
    ],
    fsmOutput: [
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "2000", "5000", "10000", "n"],
      ["1000", "2000", "5000", "10000", "drink"],
    ],
  },
  5000: {
    fsmState: [
      ["S1", "S2", "S5", "S0", "S0"],
      ["S2", "S3", "S1", "S1", "S1"],
      ["S3", "S4", "S2", "S2", "S2"],
      ["S4", "S5", "S3", "S3", "S3"],
      ["S5", "S4", "S4", "S4", "S4"],
      ["S5", "S5", "S5", "S5", "S0"],
    ],
    fsmOutput: [
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "2000", "5000", "10000", "n"],
      ["1000", "2000", "5000", "10000", "Drink"],
    ],
  },
  6000: {
    fsmState: [
      ["S1", "S2", "S5", "S0", "S0"],
      ["S2", "S3", "S6", "S1", "S1"],
      ["S3", "S4", "S2", "S2", "S2"],
      ["S4", "S5", "S3", "S3", "S3"],
      ["S5", "S6", "S4", "S4", "S4"],
      ["S6", "S5", "S5", "S5", "S5"],
      ["S6", "S6", "S6", "S6", "S0"],
    ],
    fsmOutput: [
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "2000", "5000", "10000", "n"],
      ["1000", "2000", "5000", "10000", "Drink"],
    ],
  },
  10000: {
    fsmState: [
      ["S1", "S2", "S5", "S10", "S0"],
      ["S2", "S3", "S6", "S1", "S1"],
      ["S3", "S4", "S7", "S2", "S2"],
      ["S4", "S5", "S8", "S3", "S3"],
      ["S5", "S6", "S9", "S4", "S4"],
      ["S6", "S7", "S10", "S5", "S5"],
      ["S7", "S8", "S6", "S6", "S6"],
      ["S8", "S9", "S7", "S7", "S7"],
      ["S9", "S10", "S8", "S8", "S8"],
      ["S10", "S9", "S9", "S9", "S9"],
      ["S10", "S10", "S10", "S10", "S0"],
    ],

    fsmOutput: [
      ["n", "n", "n", "n", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "n", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "n", "5000", "10000", "n"],
      ["n", "2000", "5000", "10000", "n"],
      ["1000", "2000", "5000", "10000", "drink"],
    ],
  },
};

const getNextState = (item: Item, currState: string, input: string): string => {
  const fsm = itemFSMMap[item.price];
  const row = stateMap[currState];
  const col = inputMap[input];

  const nextState = fsm.fsmState[row][col];

  return nextState;
};

const getOutput = (item: Item, currState: string, input: string): string => {
  const fsm = itemFSMMap[item.price];
  const row = stateMap[currState];
  const col = inputMap[input];

  const output = fsm.fsmOutput[row][col];

  return output;
};

export { getNextState, getOutput };
