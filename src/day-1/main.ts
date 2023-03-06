import fs from "fs/promises";

const findTheMostCalorieCarryingElf = async () => {
  let startIndex = 0;
  const calorie = await fs.readFile("input.txt", "utf8");
  const listOfCalcCalories = calorie.split("\r\n").reduce((acc, crr, index, arr) => {
      if (crr === "") {
        acc.push(
          arr
            .slice(startIndex, index)
            .reduce((acc, crr) => Number(acc) + Number(crr), 0)
        );
        startIndex = index + 1;
    }
    
    return acc;
  }, [] as number[]);
  return Math.max(...listOfCalcCalories);

};

findTheMostCalorieCarryingElf();
