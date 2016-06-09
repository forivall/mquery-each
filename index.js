'use strict';

var isObject = require('lodash.isobject');

module.exports = function queryEach(query, fn) {
  function processValue(key, value) {
    var popped = {};
    var context = {
      pop: function (op) {
        popped[op] = true;
        return value[op];
      }
    };
    if (isObject(value)) {
      for (var op in value) {
        if (!value.hasOwnProperty(op) || popped[op]) continue;
        fn.call(context, key, value[op], op);
      }
    } else {
      fn.call(context, key, value, '$eq');
    }
  }
  function topLevel(query) {
    for (var key in query) {
      if (!query.hasOwnProperty(key)) continue;
      var value = query[key];
      if (Array.isArray(value)) {
        for (var l = value.length, i = 0; i < l; i++) {
          processValue(key, value[i]);
        }
      } else {
        processValue(key, value);
      }
    }
  }
  if (Array.isArray(query)) {
    for (var l = query.length, i = 0; i < l; i++) {
      topLevel(query[i]);
    }
  } else {
    topLevel(query);
  }
};
