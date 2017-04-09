//! moment.js locale configuration
//! locale : french (fr)
//! author : Benoit Lavenier : https://github.com/blavenie

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../numeral')) :
   typeof define === 'function' && define.amd ? define(['numeral'], factory) :
   factory(global.numeral)
}(this, function (numeral) { 'use strict';

  numeral.language('fr', {
    "delimiters": {
      "thousands": " ",
      "decimal": ","
    },
    "abbreviations": {
      "thousand": "<small>x10<sup>3</sup></small>",
      "million":  "<small>x10<sup>6</sup></small>",
      "billion":  "<small>x10<sup>9</sup></small>",
      "trillion": "<small>x10<sup>12</sup></small>"
    },
    "ordinal": function (number) {
      return (number === 1) ? 'ero' : (number === 2) ? 'do' : (number === 3) ? 'ro' : (number === 4) ? 'to' : (number === 5) ? 'to' : (number === 6) ? 'to' : (number === 7) ? 'to' : (number === 8) ? 'vo' : (number === 9) ? 'no' : (number === 10) ? 'mo';
    },
    "currency": {
      "symbol": "X"
    }
  });
}));
