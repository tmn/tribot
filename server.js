var irc = require('irc')
, config = require('./config')()

console.log(config);


var bot = new irc.Client('leguin.freenode.net', 'tribot', {
  userName: config.username,
  realName: config.realname,
  port: config.port,
  debug: config.debug,

  channels: ['#tmntest']
})

var plugin_manager = require('./plugins/plugin_manager')
plugin_manager(bot, config)


bot.addListener('message', function (user, channel, text, message) {
  console.log('user: ' + user + ' | channel: ' + channel + ' | text: ' + text + ' | message: ' + message)
  // console.log(message)
})

bot.addListener('error', function(message) {
    console.log('error: ', message)
})
