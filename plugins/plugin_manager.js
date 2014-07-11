var fs = require('fs')

var Plugin = {}

var plugins = {}
var trigger_prefix = '.'

var register_trigger = function (trigger, plugin, action) {

}

Plugin.load = function (name) {
  if (plugins[name]) {
    console.error('Plugin exists')
    return
  }

  var p = require('./' + name)
  plugins[name] = { trigger: p.trigger, action: p.action }

  console.log('Plugin (' + name + ') loaded...')
}

Plugin.reload = function (name) {
  if (Plugin.unload(name)) {
    Plugin.load(name)
  }
}

Plugin.unload = function (name) {
  if (plugins[name]) {
    delete plugins[name];

    var tmp_name = require.resolve('./' + name)
    delete require.cache[tmp_name]

    console.log(name + ' unloaded...')
    return 1
  }

  console.log('couldnt unload')
  return 0
}

module.exports = function (bot, config) {
  trigger_prefix = config.trigger_prefix

  bot.addListener('message', function (user, channel, text, message) {
    if (text.charAt(0) != trigger_prefix) {
      console.log('Aint nobody got time for this...')
      return
    }

    var text = text.replace(/\s+/g, ' ')
    var args = text.substring(1).split(' ')

    if (args[0] == 'plugin') {
      if (args[1] == 'load') {
        Plugin.load(args[2])
      }
      else if (args[1] == 'unload') {
        Plugin.unload(args[2])
      }
      else if (args[1] == 'reload') {
        Plugin.reload(args[2])
      }
    }
    else {
      for (key in plugins) {
        if (plugins[key].trigger == args[0]) {
          bot.say(channel, plugins[key].action())
        }
      }
    }
  })

  console.log('Trigger prefix: ' + config.trigger_prefix)
}
