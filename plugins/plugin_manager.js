var fs = require('fs')

var Plugin = {}

var plugins = []

var trigger_prefix = '.'
var triggers = {}

var register_trigger = function (trigger, plugin, action) {

}

Plugin.load = function (name) {
  if (plugins.indexOf(name) > -1) {
    console.error('Plugin exists');
    return
  }

  require('./' + name)
  plugins.push(name)

  console.log('Plugin (' + name + ') loaded...');
}

Plugin.reload = function (name) {
  if (Plugin.unload(name)) {
    Plugin.load(name);
  }
}

Plugin.unload = function (name) {
  if (plugins.indexOf(name) > -1) {
    var name = require.resolve('./' + name)
    delete require.cache[name]

    plugins.splice(plugins.indexOf(name), 1)

    console.log(name + ' unloaded...');
    return 1
  }

  console.log('couldnt unload');
  return 0
}

module.exports = function (bot, config) {
  trigger_prefix = config.trigger_prefix

  bot.addListener('message', function (user, channel, text, message) {
    if (text.charAt(0) != trigger_prefix) {
      console.log('Do somethin...');
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
  })

  console.log('Trigger prefix: ' + config.trigger_prefix);
}
