const fs = require("fs");
const minimist = require("minimist");
const prompts = require("prompts");
const prettier = require("prettier/standalone");
const parser = require("prettier/parser-babel");

const {
  Log,
  initESLint,
  initStylelint,
  initPrettier,
  initGitHooks,
  initESLintFile,
  initPrettierFile,
  renderESLint,
  renderStylelint,
  initStylelintFile,
  renderGitHooks,
  renderPrettier,
  initReact,
  initVue,
  templates,
} = require("./src/index.js");

let projectConfig = {};

async function initProjectName(argv) {
  const projectName = argv._[0];
  if (projectName) {
    projectConfig.name = projectName;
    return;
  }
  const defaultProjectName = "mmp-project";
  await prompts([
    {
      type: "text",
      name: "projectName",
      message: "Project name:",
      initial: defaultProjectName,
      onState: (state) => (projectConfig.name = String(state.value).trim() || defaultProjectName),
    },
  ]);
  const cwd = process.cwd();
  projectConfig.cwd = cwd;
  projectConfig.projectPath = `${cwd}\/${projectConfig.name}`;
  return;
}

async function initTemplate(argv) {
  const template = argv._[1];
  if (template) {
    projectConfig.template = template;
    return;
  }
  await prompts([
    {
      type: "select",
      name: "template",
      message: "选择模板",
      choices: templates,
      onState: (state) => (projectConfig.template = String(state.value).trim() || defaultProjectName),
    },
  ]);
  if (projectConfig.template !== "none") {
    return;
  }
  projectConfig.eslint = await initESLint();
  projectConfig.stylelint = await initStylelint();
  projectConfig.prettier = await initPrettier();
  projectConfig.gitHooks = await initGitHooks();
  return;
}

async function initTemplateFiles(config) {
  if (projectConfig.template !== "none") {
    return;
  }
  initESLintFile(config);
  initStylelintFile(config);

  initPrettierFile(config);
}
function renderPackage(config) {
  const {
    files: { pkg },
    projectPath,
  } = config;

  fs.writeFile(
    `${projectPath}/package.json`,
    prettier.format(JSON.stringify(pkg), {
      parser: "json",
      plugins: [parser],
    }),
    (err) => {
      if (err) {
        Log(err);
        Log.error("---------------------- Write pkg err --------------------");
      } else {
        Log.success("---------------------- Write pkg success --------------------");
      }
    }
  );
}
function renderTemplate(config) {
  if (config.isTest) {
    Log(config);
    Log.success("---------------------- test finsh --------------------");
    return;
  }
  const { projectPath } = config;
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }
  renderESLint(config);
  renderStylelint(config);
  renderPrettier(config);
  renderGitHooks(config);
  renderPackage(config);
}

async function init() {
  const argv = minimist(process.argv.slice(2));
  projectConfig = {
    isTest: argv.test,
    files: {
      pkg: {
        version: "0.0.0",
        description: "",
        main: "index.js",
        scripts: {
          start: "node index.js",
        },
        license: "ISC",
        devDependencies: {
          eslint: "^8.32.0",
          "eslint-config-prettier": "^8.6.0",
          "eslint-plugin-jsdoc": "^39.6.9",
          "eslint-plugin-prettier": "^4.2.1",
        },
      },
    },
  };

  await initProjectName(argv);
  await initTemplate(argv);

  await initTemplateFiles(projectConfig);
  await renderTemplate(projectConfig);
}
init();
