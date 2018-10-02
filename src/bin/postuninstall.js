#!/usr/bin/env node
var log = require('npmlog')
var util = require('util');
var exec = util.promisify(require('child_process').exec);

log.level = 'andjosh'
async function andjosh (args, cb) {
  log.heading = ''
  log.addLevel('andjosh', 100000, log.headingStyle)
  log.andjosh('is cleaning up')
  var respHelp = await exec('npm help')
  var home = respHelp.stdout.match(/npm@\d.*\W(\/.*)/)[1]
  var respRm = await exec(`rm ${home}/lib/andjosh.js`)
  log.silly(respRm.stderr)
  respRm = await exec(`rm ${home}/lib/boom.js`)
  log.silly(respRm.stderr)
  var respRemoveCmd = await exec(`cat ${home}/lib/config/cmd-list.js | sed "s/'andjosh','boom',//" > ${home}/lib/config/cmd-list.tmp.js`)
  log.silly(respRemoveCmd.stderr)
  var respReplaceCmd = await exec(`mv ${home}/lib/config/cmd-list.tmp.js ${home}/lib/config/cmd-list.js`)
  log.silly(respReplaceCmd.stderr)
  log.andjosh('has left the building', 'Thanks for the visit!')
}
andjosh()
