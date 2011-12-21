var types = require('./types')
  , classes = require('./classes')
  ;


//
// All of these are private and only used by randexp
// it's assumed that they will always be called with the correct input
//

var CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?'
  , SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 }
  ;

var util = module.exports = {

  // finds character representations in str and convert all to
  // their respective characters
  strToChars: function(str) {
    var chars_regex = /(\[\\b\])|\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
    str = str.replace(chars_regex, function(s, b, a16, b16, c8, dctrl, eslsh) {
      var code = b     ? 8 :
                 a16   ? parseInt(a16, 16) :
                 b16   ? parseInt(b16, 16) :
                 c8    ? parseInt(c8,   8) :
                 dctrl ? CTRL.indexOf(dctrl) :
                 eslsh ? SLSH[eslsh] : undefined;
      
      var c = String.fromCharCode(code);

      // escape special regex characters
      if (/[\[\]{}\^$.|?*+()]/.test(c)) {
        c = '\\' + c;
      }

      return c;
    });

    return str;
  },


  // turns class into tokens
  // reads str until it encounters a ] not preceeded by a \
  tokenizeClass: function(str) {
    var tokens = []
      , regexp = /\\(?:(w)|(d)|(s)|(.))|(\.)|(.-.)|(\])|(.)/g
      , rs, c
      ;


    while ((rs = regexp.exec(str)) != null) {
      if (rs[1]) {
        tokens.push(classes.words());

      } else if (rs[2]) {
        tokens.push(classes.ints());

      } else if (rs[3]) {
        tokens.push(classes.whitespace());

      } else if (c = rs[4] || rs[8]) {
        tokens.push({
            type: types.CHAR
          , value: c.charCodeAt(0)
        })

      } else if (rs[5]) {
        tokens.push(classes.anyChar());

      } else if (c = rs[6]) {
        tokens.push({
            type: types.RANGE
          , from: c.charCodeAt(0)
          ,   to: c.charCodeAt(2)
        });

      } else {
        return [tokens, regexp.lastIndex];
      }
    }
  }
};