/*

*/
var ENMergeDateRangeRefiner = require('../en/ENMergeDateRangeRefiner').Refiner;

exports.Refiner = function NLMergeDateRangeRefiner() {
    ENMergeDateRangeRefiner.call(this);

    this.pattern = function () {
        return /^\s*(tot|t\/m|tot en met|\-)\s*$/i;
    };
};
