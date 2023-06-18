import dotenv from "dotenv"
const CracoAlias = require("craco-alias")
dotenv.config({ path: "../.env" })
const path = require("path")

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        tsConfigPath: "tsconfig.paths.json",
      },
    },
  ],
}

// module.exports = {
//   NEST: {
//     HOST: process.env.REACT_NEST_HOSTNAME,
//   },
//   webpack: {
//     alias: {
//       '@': path.resolve(__dirname, 'src/')
//     }
//   },
//   jest: {
//     configure: {
//       moduleNameMapper: {
//         '^@(.*)$': '<rootDir>/src$1'
//       }
//     }
//   }
// };
