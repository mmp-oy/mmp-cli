
const prompts = require('prompts')
const rules = require('./rules')
const { initTypescriptESlint } = require('./Typescript')
const { initVueESlintrc } = require('./vue')



async function initESLint() {
  return prompts([
    {
      type: 'toggle',
      name: 'Typescript',
      message: 'Use Typescript?',
      initial: true,
      active: 'yes',
      inactive: 'no'
    }
  ])
}
async function initESLintFile(config) {
  config.files.eslintrc = {
    "env": {
      "browser": true,
      "es2023": true,

    },
    "extends": ["prettier"],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "plugins": ["eslint-plugin-jsdoc"],
    rules,
    "globals": {
      "process": true,
      "__dirname": true
    },
  }


  initTypescriptESlint(config)

  initVueESlintrc(config)

}

function renderESLint() {

}
module.exports = { initESLint, renderESLint, initESLintFile }