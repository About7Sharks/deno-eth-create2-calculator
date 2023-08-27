// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  typeCheck: false,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "deno-eth-create2-calculator",
    version: Deno.args[0],
    description: "Library to calculate an ethereum create2 address in advance",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/about7sharks/deno-eth-create2-calculator.git",
    },
    bugs: {
      url: "https://github.com/about7sharks/deno-eth-create2-calculator/issues",
    },
  },
  postBuild() {
    //     // steps to run after building and before running the tests
    //     Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
