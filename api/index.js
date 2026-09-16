import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// backend/package.json declares "commonjs", so the backend and all of its
// require(...) dependencies continue to run as CommonJS.
const app = require("../backend/server.js");

module.exports = app;
