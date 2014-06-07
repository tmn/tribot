var config = {
  local: {
    port: 6667,
    username: 'tribot',
    realname: 'a tmn service',
    debug: true,
    trigger_prefix: '.'
  }
}


module.exports = function (mode) {
  return config.local
}
