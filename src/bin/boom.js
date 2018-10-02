#!/usr/bin/env node

module.exports = boom

var readline = require('readline')
var usage = function() {}
var log = { silly: console.log }
try {
  usage = require('./utils/usage')
} catch(e) {
  log.silly(e)
}

boom.usage = usage(
  'boom',
  'npm boom'
)

boom.completion = function (opts, cb) {
  cb()
}

function boom (args, cb) {
  (new Game({ speed: 9, onStop: cb })).start()
}

function Game(options){
  if (!(this instanceof Game)) return new Game(options)

  options = options || {}
  this.width = options.width || 50
  this.world = []
  this.block = '\x1b[31m▖\x1b[0m'
  this.space = ' '
  var wdx = 1
  while (wdx < this.width) {
    this.world.push(this.space)
    wdx++
  }
  this.blocks = options.blocks || generateBlocks(2000)
  this.blockIndex = 0
  this.stream = process.stdout
  this.position = options.position || 20
  this.delay = 1000 / (options.speed || 10)
  this.onStop = options.onStop
  this.state = {
    cursor: 0,
    jumping: false,
    jumpPosition: 0,
    jumpSequence: '▖▘▝'.split(''),
  }
  this.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  this.rl.on('close', function() {
    this.stop()
    process.exit(0)
  }.bind(this))
  return this
}

Game.prototype.onTick = function () {
  this.clearLine(this.stream)
  var world = this.world.concat([])
  world.splice(this.position, 1, this.getPlayer())
  this.state.jumping = false
  this.stream.write(world.join(''))
}

Game.prototype.getPlayer = function() {
  var pos = this.state.jumpPosition
  if (this.state.jumping || pos) {
    this.state.jumpPosition++
  }
  if (this.state.jumpPosition > 2) {
    this.state.jumpPosition = 0
  }
  return this.state.jumpSequence[pos]
}

Game.prototype.lose = function() {
  console.log('Boom!')
  console.log(`Score: ${this.state.cursor}`)
  this.stop()
  process.exit(0)
}

Game.prototype.colliding = function() {
  return this.world[this.position] !== this.space
    && this.state.jumpPosition == 0
}

Game.prototype.start = function() {
  function iteration() {
    this.world.shift()
    if (this.colliding()) {
      return this.lose()
    }
    var land = this.blocks[this.blockIndex]
    if (land == this.state.cursor) {
      this.world.push(this.block)
      this.blockIndex++
    } else {
      this.world.push(this.space)
    }
    this.onTick()
    this.state.cursor++
  }

  readline.emitKeypressEvents(process.stdin)
  if (process.stdin.isTTY)
    process.stdin.setRawMode(true)
  process.stdin.on('keypress', this.handleKey.bind(this))
  iteration.call(this)
  this.id = setInterval(iteration.bind(this), this.delay)
  return this
}

Game.prototype.handleKey = function(a, key) {
    if (key.name !== 'up'
    && key.name !== 'w') return
    if (this.state.jumping || this.state.jumpPosition) return
    this.state.jumping = true
}

Game.prototype.stop = function(clear) {
  clearInterval(this.id)
  this.id = undefined
  if (clear) {
    this.clearLine(this.stream)
  }
  if (this.onStop) {
    this.onStop()
  }
  return this
}

Game.prototype.clearLine = function(stream) {
  readline.clearLine(stream, 0)
  readline.cursorTo(stream, 0)
  return this
}

function generateBlocks(len) {
  var blocks = []
  var start = 1
  var used = 0
  for (var i = 1; i < len; i++) {
    if (Math.random() > 0.75 && !used) {
      blocks.push(i)
      used = 3
    } else {
      used = Math.max(0, used - 1)
    }
  }
  return blocks
}
