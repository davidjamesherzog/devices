'use strict';

module.exports = function (gulp, config, plugins) {
  /**
   * Compiles *.js files, sourcemaps,
   */
  return {
    deps: ['tsc:client']
    //deps: ['tsc:client', 'tsc:server'] - todo - figure out why this transpiles to both client and server
  };
};
