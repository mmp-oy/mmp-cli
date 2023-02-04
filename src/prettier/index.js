
const prompts = require('prompts')

const prettierList = [
  { title: 'vscode', value: 'vscode' },
  { title: 'no', value: false },
]
async function initPrettier() {
  return prompts([
    {
      type: 'select',
      name: 'vscode',
      message: 'Prettier',
      choices: prettierList,
    }
  ])

}
async function renderPrettier(config) {
  const { projectPath, eslint, pkg } = config




}
module.exports = { initPrettier, renderPrettier }
