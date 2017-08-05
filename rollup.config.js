import babel from "rollup-plugin-babel";

export default {
  entry: "src/index.js",
  format: "umd",
  moduleName: "StyledMediaQuery",
  sourceMap: true,
  plugins: [
    babel()
  ],
  dest: "dist/bundle.js"
};
