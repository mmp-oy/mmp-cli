const prompts = require('prompts')

const gitHooksList = [
  { title: 'lint-staged', value: 'lint-staged', selected: true },
  { title: 'commitlint', value: 'commitizen', selected: true },
  { title: 'husky', value: 'husky', selected: true }
]
async function initGitHooks() {
  const { gitHooks } = await prompts([
    {
      type: 'multiselect',
      name: 'gitHooks',
      message: 'git-hooks',
      choices: gitHooksList,
    }
  ])

  const res = {}
  gitHooks.reduce((a, b) => { a[[b]] = b; return a }, res)


  return Promise.resolve(res)
}
async function renderGitHooks(config) {
  const { projectPath, eslint, pkg } = config




}
module.exports = { initGitHooks, renderGitHooks }
