/*
  
*/
var ENMergeDateRangeRefiner = require('../EN/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function DEMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () {
        return /^\s*(bis(?:\s*(?:am|zum))?|\-)\s*$/i
    };
};
