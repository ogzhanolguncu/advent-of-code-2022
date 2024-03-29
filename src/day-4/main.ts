import fs from "fs/promises";
function sectionContainsPart1(
  [alo, ahi]: number[],
  [blo, bhi]: number[]
) {
  return alo <= blo && bhi <= ahi;
}
function sectionContainsPart2(
  [alo, ahi]: number[],
  [blo, bhi]: number[]
) {
  return alo <= blo && ahi >= blo;
}

function sectionsContains(a: number[], b: number[]) {
  return sectionContainsPart2(a, b) || sectionContainsPart2(b, a);
}

function parseAssignments(input: string) {
  return input
    .split("\n")
    .map((text) => text.split(",").map(parseSectionRange));
}

function parseSectionRange(input) {
  return input.split("-").map(Number);
}

const overlapFinder = async () => {
  const inputs = await fs.readFile("day-4-input.txt", "utf8");
  const testAssignments = parseAssignments(inputs);
  console.log(
    testAssignments.filter(([a, b]) => sectionsContains(a, b)).length
  );
};

overlapFinder();
