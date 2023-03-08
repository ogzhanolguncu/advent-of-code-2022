import fs from "fs/promises";

type EquallySplittedString = [string, string];

const alphaVal = (s: string, isLowercase: boolean) =>
  s.charCodeAt(0) - (isLowercase ? 97 : 39) + 1;

function chunkString(str: string, length: number) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}
const isUpperCase = (string) => /^[A-Z]*$/.test(string);

function findDuplicateChar(equallySplittedTwo: EquallySplittedString): string {
  return equallySplittedTwo[0]
    .split("")
    .find((x) => equallySplittedTwo[1].split("").includes(x));
}

var chunks = function (array: unknown[], size: number) {
  const results = [];
  while (array.length) {
    results.push(array.splice(0, size));
  }
  return results;
};

function intersect(first = [], ...rest) {
  rest = rest.map((array) => new Set(array));
  return first.filter((e) => rest.every((set) => set.has(e)));
}

const rucksackOrganizer = async () => {
  const inputs = await fs.readFile("day-3-input.txt", "utf8");
  const eachRun = inputs.split("\n");
  const chunkedByThree = chunks(eachRun, 3);
  let total = 0;

  chunkedByThree.forEach((element) => {
    const firstArr = element[0].split("");
    const secondArr = element[1].split("");
    const thirdArr = element[2].split("");

    const foundIntersectedElement = intersect(firstArr, secondArr, thirdArr)[0];

    total += alphaVal(
      foundIntersectedElement,
      !isUpperCase(foundIntersectedElement)
    );
  });
};

rucksackOrganizer();
