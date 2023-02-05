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
  const {
    stylelint: { scss },
  } = config;
  if (scss) {
    config.files.stylelintrc.overrides.push({
      extends: ["stylelint-config-recommended-scss", "stylelint-config-recess-order"],
      files: ["**/*.scss"],
    });
    devDependencies = {
      "stylelint-config-recommended-scss": "^8.0.0",
      "stylelint-scss": "^4.3.0",
      "stylelint-config-standard-scss": "^6.1.0",
    };

    Object.assign(config.files.pkg.devDependencies, devDependencies);
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
    devDependencies = {
      less: "^4.1.3",
      "less-loader": "^11.0.0",
      "postcss-less": "^6.0.0",
      "stylelint-less": "^1.0.6",
    };

    Object.assign(config.files.pkg.devDependencies, devDependencies);
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
  const devDependencies = {
    "stylelint-config-recess-order": "^3.1.0",
    "stylelint-config-standard": "^29.0.0",
  };

  Object.assign(config.files.pkg.devDependencies, devDependencies);
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
