
const common_routes = require('./common');
const bind_routes = require('./bind');
const device_routes = require("./device")
// const auth_routes = require('./auth');

module.exports = (router) => { 
  // auth_routes(router);
  common_routes(router);
  bind_routes(router);
  device_routes(router);
}

 