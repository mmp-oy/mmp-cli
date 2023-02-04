const config = require('./config')
const eslint = require('./eslint')
const git = require('./git')
const prettier = require('./prettier')
const stylelint = require('./stylelint')
const vue = require('./vue')
const react = require('./react')
const utils = require("./utils");
async function renderPkg(config) {
  const { projectPath, eslint, pkg } = config




}

module.exports = {
  ...utils,
  renderPkg,
  ...config,
  ...eslint,
  ...stylelint,
  ...prettier,
  ...git,
  ...vue,
  ...react
}