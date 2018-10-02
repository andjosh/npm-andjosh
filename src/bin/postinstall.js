#!/usr/bin/env node
var log = require('npmlog')
var util = require('util');
var exec = util.promisify(require('child_process').exec);

log.level = 'andjosh'
async function andjosh (args, cb) {
  log.heading = ''
  log.addLevel('andjosh', 100000, log.headingStyle)
  log.andjosh('is setting things up', 'Don\'t mind the person behind the curtain!')
  var respHelp = await exec('npm help')
  var home = respHelp.stdout.match(/npm@\d.*\W(\/.*)/)[1]
  var respCp = await exec(`cp ./src/bin/index.js ${home}/lib/andjosh.js`)
  log.silly(respCp.stderr)
  respCp = await exec(`cp ./src/bin/boom.js ${home}/lib/boom.js`)
  log.silly(respCp.stderr)
  var respAddCmd = await exec(`cat ${home}/lib/config/cmd-list.js | sed "s/xmas/xmas','andjosh','boom/" > ${home}/lib/config/cmd-list.tmp.js`)
  log.silly(respAddCmd.stderr)
  var respReplaceCmd = await exec(`mv ${home}/lib/config/cmd-list.tmp.js ${home}/lib/config/cmd-list.js`)
  log.silly(respReplaceCmd.stderr)
  log.andjosh('is here to help', 'Try: `npm andjosh` or `npm boom`')
}
andjosh()
