import fs from "fs/promises";

const findTheMostCalorieCarryingElf = async () => {
  let startIndex = 0;
  const calorie = await fs.readFile("input.txt", "utf8");
  const listOfCalcCalories = calorie
    .split("\r\n")
    .reduce((acc, crr, index, arr) => {
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

  const sortedByLowestToHighest = listOfCalcCalories.sort((a, b) => a - b);
  const top = sortedByLowestToHighest.pop() ?? 0;
  const second = sortedByLowestToHighest.pop() ?? 0;
  const third = sortedByLowestToHighest.pop() ?? 0;
  return top + second + third;
};

findTheMostCalorieCarryingElf();
