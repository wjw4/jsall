import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/util/index.ts",
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps(),
  ],
  output: [
    // {
    //   format: "cjs",
    //   file: "bundle/util.cjs.js"
    // },
    {
      format: "es",
      file: "bundle/util.esm.js"
    },
  ]
}