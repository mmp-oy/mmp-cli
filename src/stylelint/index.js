const fs = require("fs");
const prompts = require("prompts");
const prettier = require("prettier/standalone");
const parser = require("prettier/parser-babel");
const { Log } = require("../utils");
const styleList = [
  { title: "scss", value: "scss" },
  { title: "less", value: "less" },
];

async function initStylelint() {
  const { css } = await prompts([
    {
      type: "multiselect",
      name: "css",
      message: "Stylelint",
      choices: styleList,
    },
  ]);

  return css.reduce((a, b) => {
    a[[b]] = b;
    return a;
  }, {});
}

function initScssConfig(config) {
  console.log(config);
  const {
    stylelint: { scss },
  } = config;
  if (scss) {
    config.files.stylelintrc.overrides.push({
      extends: ["stylelint-config-recommended-scss", "stylelint-config-recess-order"],
      files: ["**/*.scss"],
    });
  }
}

function initLessConfig(config) {
  const {
    stylelint: { less },
  } = config;
  if (less) {
    config.files.stylelintrc.overrides.push({
      extends: ["stylelint-config-recommended-less", "stylelint-config-recess-order"],
      customSyntax: "postcss-less",
      files: ["**/*.less"],
    });
  }
}
function initStylelintFile(config) {
  config.files.stylelintrc = {
    extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
    overrides: [],
    rules: {
      "no-empty-first-line": true,
      "selector-pseudo-class-no-unknown": [
        true,
        {
          ignorePseudoClasses: ["deep"],
        },
      ],
    },
  };
  initScssConfig(config);
  initLessConfig(config);
}
async function renderStylelint(config) {
  const { files, projectPath } = config;
  const { stylelintrc } = files;

  fs.writeFile(
    `${projectPath}/.stylelintrc`,
    prettier.format(JSON.stringify(stylelintrc), {
      parser: "json",
      plugins: [parser],
    }),
    (err) => {
      if (err) {
        Log(err);
        Log.error("---------------------- Write .stylelintrc err --------------------");
      } else {
        Log.success("---------------------- Write .stylelintrc success --------------------");
      }
    }
  );
}
module.exports = { initStylelint, initStylelintFile, renderStylelint };
