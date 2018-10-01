#!/usr/bin/env node

module.exports = andjosh

var log = require('npmlog')
var prompt = require('prompt');
var colors = require('colors/safe');
var usage = function() {};
try {
    usage = require('./utils/usage')
} catch(e) {
    log.silly(e);
}

andjosh.usage = usage(
  'andjosh',
  'npm andjosh [<something>]'
)

andjosh.completion = function (opts, cb) {
  cb()
}

function andjosh (args, cb) {
  log.heading = ''
  log.addLevel('andjosh', 100000, log.headingStyle)
  log.andjosh('wants to work with you', 'I think we would do great together!')
  log.andjosh('is curious', 'about you')
  prompt.message = '_______'
  prompt.start()

  prompt.get({
    properties: {
      name: {
        message: "What is your name?",
          handler: console.log
      }
    }
  }, function (err, result) {
    console.log(colors.cyan("You said your name is: " + result.name))
  })
  if (cb) { cb() }
}
andjosh()
