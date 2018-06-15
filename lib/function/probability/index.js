define(function(localRequire, exports, module) { var requireOrig = require; require = localRequire;
'use strict';
module.exports = [
  //require('./distribution'), // TODO: rethink math.distribution
  require('./combinations'),
  require('./factorial'),
  require('./gamma'),
  require('./kldivergence'),
  require('./multinomial'),
  require('./permutations'),
  require('./pickRandom'),
  require('./random'),
  require('./randomInt')
];

require = requireOrig;});
