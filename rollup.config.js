import dotenv from "rollup-plugin-dotenv";
import { terser } from 'rollup-plugin-terser';

export default {
  input: "app.js",
  output: {
    file: "build/bundle.js",
    format: "es"
  },
  plugins: [dotenv(), terser()]
}