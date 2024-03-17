
const common_routes = require('./common');
// const auth_routes = require('./auth');

module.exports = (router) => { 
  // auth_routes(router);
  common_routes(router);
}

 