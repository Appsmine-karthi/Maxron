
const common_routes = require('./common');
const bind_routes = require('./bind');
// const auth_routes = require('./auth');

module.exports = (router) => { 
  // auth_routes(router);
  common_routes(router);
  bind_routes(router);
}

 