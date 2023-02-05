const fs = require("fs");
const prompts = require("prompts");
const rules = require("./rules");
const { initTypescriptESlint } = require("./Typescript");
const { initVueESlintrc } = require("./vue");
const prettier = require("prettier/standalone");
const { Log } = require("../utils");
const parser = require("prettier/parser-babel");
async function initESLint() {
  return prompts([
    {
      type: "toggle",
      name: "Typescript",
      message: "Use Typescript?",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ]);
}
function initESLintFile(config) {
  config.files.eslintrc = {
    env: {
      browser: true,
      es2023: true,
    },
    extends: ["prettier"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["eslint-plugin-jsdoc"],
    overrides: [],
    globals: {
      process: true,
      __dirname: true,
    },
    rules,
  };

  initTypescriptESlint(config);

  initVueESlintrc(config);
}

function renderESLint(config) {
  const { files, projectPath } = config;
  const { eslintrc } = files;

  fs.writeFile(
    `${projectPath}/.eslintrc`,
    prettier.format(JSON.stringify(eslintrc), {
      parser: "json",
      plugins: [parser],
    }),
    (err) => {
      if (err) {
        Log(err);
        Log.error("---------------------- Write .eslintrc err --------------------");
      } else {
        Log.success("---------------------- Write .eslintrc success --------------------");
      }
    }
  );
}
module.exports = { initESLint, renderESLint, initESLintFile };
