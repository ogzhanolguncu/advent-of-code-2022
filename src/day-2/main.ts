import fs from "fs/promises";

const winningConditions = {
  A: "Y",
  B: "Z",
  C: "X",
};
const drawConditions = {
  A: "X",
  B: "Y",
  C: "Z",
};
const lossConditions = {
  A: "Z",
  B: "X",
  C: "Y",
};
const matchPoints = {
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};
const roundPoints = {
  X: 1,
  Y: 2,
  Z: 3,
};

const findTheMostCalorieCarryingElf = async () => {
  const inputs = await fs.readFile("day-2-input.txt", "utf8");
  const eachRun = inputs.split("\n");
  let total = 0;

  eachRun.forEach((element) => {
    const opponent = element.split(" ")[0];
    const me = element.split(" ")[1] as "X" | "Y" | "Z";

    if (me === "X") {
      const moveMadeByMe = roundPoints[lossConditions[opponent]];
      total += moveMadeByMe + matchPoints["LOSS"];
    }

    if (me === "Y") {
      const moveMadeByMe = roundPoints[drawConditions[opponent]];
      total += moveMadeByMe + matchPoints["DRAW"];
    }

    if (me === "Z") {
      const moveMadeByMe = roundPoints[winningConditions[opponent]];
      total += moveMadeByMe + matchPoints["WIN"];
    }
  });

  console.log({ total });
};

findTheMostCalorieCarryingElf();
