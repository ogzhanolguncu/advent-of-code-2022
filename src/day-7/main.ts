import fs from "fs/promises";

class Tree {
  root: TreeNode;
  current: TreeNode;

  constructor() {
    this.root = new TreeNode(true, "root");
    this.current = this.root;
  }

  reset_to_root(): void {
    this.current = this.root;
  }

  go_up_one_level(): void {
    this.current = this.current.parent;
  }

  go_to_child(name: string): void {
    this.current = this.current.children.find(
      (child) => child.name === name
    );
  }

  add_new_child(child: TreeNode): void {
    this.current.add_child(child);
  }
}

class TreeNode {
  is_dir: boolean;
  name: string;
  size: number | null;
  children: TreeNode[];
  parent: TreeNode | null;

  constructor(
    is_dir: boolean,
    name: string,
    size: number | null = null
  ) {
    this.is_dir = is_dir;
    this.name = name;
    this.size = size;
    this.children = [];
    this.parent = null;
  }

  add_child(child: TreeNode): void {
    child.parent = this;
    this.children.push(child);
  }

  get_size(): number {
    if (this.is_dir) {
      let total_size = 0;
      for (const child of this.children) {
        total_size += child.get_size();
      }
      return total_size;
    } else {
      return this.size ?? 0;
    }
  }

  findSubdirectoriesPart1() {
    let dir_sizes = 0;
    if (this.is_dir) {
      this.children.forEach((child) => {
        if (child.is_dir && child.get_size() <= 100000) {
          dir_sizes +=
            child.get_size() + child.findSubdirectoriesPart1();
        } else {
          dir_sizes += child.findSubdirectoriesPart1();
        }
      });
    }

    return dir_sizes;
  }

  findSubdirectoriesPart2(
    this: TreeNode,
    min_size: number
  ): number[] {
    const dirSizes: number[] = [];
    if (this.is_dir) {
      for (const child of this.children) {
        if (child.is_dir && child.get_size() >= min_size) {
          dirSizes.push(
            child.get_size(),
            ...child.findSubdirectoriesPart2(min_size)
          );
        } else {
          dirSizes.push(...child.findSubdirectoriesPart2(min_size));
        }
      }
    }
    return dirSizes;
  }
}

const treeBuilder = async () => {
  const inputs = await fs.readFile("day-7-input.txt", "utf8");
  const lines = inputs.split("\n").map((line) => line.trim());

  const tree = new Tree();

  while (lines.length > 0) {
    const line = lines.shift();
    if (line === "$ cd /") {
      tree.reset_to_root();
    } else if (line === "$ ls") {
      while (lines.length > 0 && !lines[0].includes("$")) {
        const entry = lines.shift();
        const [size, name] = entry.split(" ");
        const newNode = size.match(/^\d+$/)
          ? new TreeNode(false, name, parseInt(size))
          : new TreeNode(true, name);
        tree.add_new_child(newNode);
      }
    } else if (line === "$ cd ..") {
      tree.go_up_one_level();
    } else if (line.includes("$ cd")) {
      const [, , name] = line.split(" ");
      tree.go_to_child(name);
    }
  }

  const current_empty_space = 70000000 - tree.root.get_size();
  const possible_dirs = Math.min(
    ...tree.root.findSubdirectoriesPart2(
      30000000 - current_empty_space
    )
  );

  console.log({ possible_dirs });
};

treeBuilder();
