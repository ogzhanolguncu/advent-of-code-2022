import fs from "fs/promises";
// move 1 from 2 to 1
//from [row][column] to push [row]

const crates = {
  1: ["W", "R", "T", "G"],
  2: ["W", "V", "S", "M", "P", "H", "C", "G"],
  3: ["M", "G", "S", "T", "L", "C"],
  4: ["F", "R", "W", "M", "D", "H", "J"],
  5: ["J", "F", "W", "S", "H", "L", "Q", "P"],
  6: ["S", "M", "F", "N", "D", "J", "P"],
  7: ["J", "S", "C", "G", "F", "D", "B", "Z"],
  8: ["B", "T", "R"],
  9: ["C", "L", "W", "N", "H"],
};

//     [D]
// [N] [C]
// [Z] [M] [P]

// let crates = {
//   1: ["n", "z"],
//   2: ["d", "c", "m"],
//   3: ["p"],
// };
type Crates = typeof crates;

function parseAssignments(input: string) {
  return input
    .split("\n")
    .map((p) => p.match(/\d+/g).map(Number))
    .map(breakArrayIntoTwoArray);
}

function breakArrayIntoTwoArray(input: number[]) {
  return [input.slice(0, 1), input.slice(1, 3)];
}

function getCratesAtTop(crates: Crates) {
  return Object.entries(crates).reduce(
    (acc, [_, val]) => [...acc, val[0]],
    []
  );
}

function joinCrateNamesIntoSingleWord(crateNames: string[]) {
  return crateNames.join("");
}

const crateOrganizer = async () => {
  const inputs = await fs.readFile("day-5-input.txt", "utf8");
  const testAssignments = parseAssignments(inputs);

  testAssignments.forEach(([[amount], [start, destination]]) => {
    const partWeWantToMove = crates[start].splice(0, amount);
    crates[destination].unshift(...partWeWantToMove);
  });

  console.log(joinCrateNamesIntoSingleWord(getCratesAtTop(crates)));
};

crateOrganizer();
