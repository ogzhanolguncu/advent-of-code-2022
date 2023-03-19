import fs from "fs/promises";
//PART ONE
// function splitString(str: string) {
//   const result: { chars: string[]; i: number }[] = [];
//   for (let i = 0; i < str.length - 3; i++) {
//     const substring = str.substring(i, i + 4);
//     const chars = substring.split("");
//     result.push({ chars, i });
//   }
//   return result;
// }
function splitString(str: string) {
  const result: { chars: string[]; i: number }[] = [];
  for (let i = 0; i < str.length - 13; i++) {
    const substring = str.substring(i, i + 14);
    const chars = substring.split("");
    result.push({ chars, i });
  }
  return result;
}

// bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 5
const packetDecoder = async () => {
  const inputs = await fs.readFile("day-6-input.txt", "utf8");
  const chunkifiedByEachLetter = splitString(inputs);

  //PART 1
  //   console.log(
  //     chunkifiedByEachLetter.find(
  //       (x) => [...new Set(x.chars)].length === 4
  //     ).i + 4
  //   );

  console.log(
    chunkifiedByEachLetter.find(
      (x) => [...new Set(x.chars)].length === 14
    ).i + 14
  );
};

packetDecoder();
