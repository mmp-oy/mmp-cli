const prompts = require('prompts')

const styleList = [
  { title: 'scss', value: 'scss' },
  { title: 'less', value: 'less' },
]

async function initStylelint() {
  return prompts([
    {
      type: 'multiselect',
      name: 'css',
      message: 'Stylelint',
      choices: styleList,
    }
  ])
}

async function renderStylelint(config) {
  const { projectPath, eslint, pkg } = config




}
module.exports = { initStylelint, renderStylelint }
