const { red, green, bold, yellow } = require('kolorist')



function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

function Log(text) {
  console.log(text)
}
Log.success = function (text) {
  console.log(`  ${bold(green(text))}`)
}
Log.warn = function (text) {
  console.log(`  ${bold(yellow(text))}`)
}
Log.error = function (text) {
  console.log(`  ${bold(red(text))}`)
}

module.exports = {
  Log,
  isValidPackageName,
  toValidPackageName
}