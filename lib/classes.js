var types = require('./types');

var INTS = function() {
 return [
    { type: types.RANGE
    , from: 48
    , to: 57 }
  ];
};

var WORDS = function() {
 return [
      { type: types.RANGE
      , from: 97
      , to: 122 }
    , { type: types.RANGE
      , from: 65
      , to: 90 }
  ].concat(INTS());
};

var WHITESPACE = function() {
 return [
      { type: types.CHAR
      , value: 12 }
    , { type: types.CHAR
      , value: 10 }
    , { type: types.CHAR
      , value: 13 }
    , { type: types.CHAR
      , value: 9 }
    , { type: types.CHAR
      , value: 11 }
    , { type: types.CHAR
      , value: 160 }
    , { type: types.CHAR
      , value: 5760 }
    , { type: types.CHAR
      , value: 6158 }
    , { type: types.CHAR
      , value: 8192 }
    , { type: types.CHAR
      , value: 8193 }
    , { type: types.CHAR
      , value: 8194 }
    , { type: types.CHAR
      , value: 8195 }
    , { type: types.CHAR
      , value: 8196 }
    , { type: types.CHAR
      , value: 8197 }
    , { type: types.CHAR
      , value: 8198 }
    , { type: types.CHAR
      , value: 8199 }
    , { type: types.CHAR
      , value: 8200 }
    , { type: types.CHAR
      , value: 8201 }
    , { type: types.CHAR
      , value: 8202 }
    , { type: types.CHAR
      , value: 8232 }
    , { type: types.CHAR
      , value: 8233 }
    , { type: types.CHAR
      , value: 8239 }
    , { type: types.CHAR
      , value: 8287 }
    , { type: types.CHAR
      , value: 12288 }
  ];
};


// predefined class objects
exports.words = function() {
  return {
      type: types.CLASS
    , value: WORDS()
  };
};

exports.notWords = function() {
  return {
      type: types.CLASS
    , set: WORDS()
    , not: true
  };
};

exports.ints = function() {
  return {
      type: types.CLASS
    , set: INTS()
  };
};

exports.notInts = function() {
  return {
      type: types.CLASS
    , set: INTS()
    , not: true
  };
};

exports.whitespace = function() {
  return {
      type: types.CLASS
    , set: WHITESPACE()
  };
};

exports.notWhitespace = function() {
  return {
      type: types.CLASS
    , set: WHITESPACE()
    , not: true
  };
};

exports.anyChar = function() {
  return {
      type: types.CLASS
    , chars: '\n'
    , value: [{
        type: types.CHAR
      , value: 10
    }]
    , not: true
  };
};