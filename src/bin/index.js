#!/usr/bin/env node

module.exports = andjosh

var log = require('npmlog')
var usage = function() {}
try {
  usage = require('./utils/usage')
} catch(e) {
  log.silly(e)
}

andjosh.usage = usage(
  'andjosh',
  'npm andjosh'
)

andjosh.completion = function (opts, cb) {
  cb()
}

function andjosh (args, cb) {
  log.heading = ''
  log.addLevel('andjosh', 100000, log.headingStyle)
  log.andjosh('wants to work with you', 'I think we would do great together!')
  log.andjosh('is curious')
  var monologue =`
    Isn't it strange that I could write and deploy this,
    my very own npm command?
    I mean, it's not really that strange.
    npm has increasingly been about extensibility.
    I love that.
    I depend on that.
    I write my won npm-installable CLI packages.
    I write npm package-level scripts all the time.
    Each time I teach others how to do so,
    it strengthens my conviction that npm will last.
    A vibrant plugin ecosystem is a common thread
    I see among the best tolling we have built.
    I want to bring that into the npm fold.

    We should probably be securing people
    away from this kind of thing.
    Simple steps (secure hashing, etc) would help
    to solidify the reputation of npm in the community.
    In addition to securing the underlying npm commands,
    (to prevent what I've done here :)
    I would love to explore a way to extend npm.

    What if people could build an npm extension
    to view their profile & package stats?
    to configure and replicate their global installs?
    to build more xmas trees?
    Who knows what the community will need in the future?

    I want to be that person,
    working to build the community up around npm.
    It's not without problems,
    but yours are the problems I have in mind.
    I've already been helping in the background,
    spreading the word here and there.
    I've been contirbuting to great work remotely,
    moving and leading within teams for several years.
    Give me a chance to move with this community,
    forward with full energy.

    Thanks for reading my thoughts here.
    I hope you'll reach out to talk more about
    THIS ABSOLUTELY FANTASTIC ROLE.

    If you want something to do in the meantime,
    try 'npm boom' and see how far you can hop.
  `
  monologue.split('\n').map(function(line) {
    log.andjosh('', line.trim())
  })
  log.andjosh('wishes you the best')
  cb()
}
