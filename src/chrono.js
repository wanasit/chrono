
var Chrono = function(options) {

    this.options = options;
    this.parsers = new Object(options.parsers);
    this.refiners = new Object(options.refiners);
}


Chrono.prototype.parse = function(text, refDate, opt) {

    refDate = refDate || new Date();
    opt = opt || {};

    var allResults = [];

    this.parsers.forEach(function (parser) {
        var results = parser.execute(text, refDate, opt);
        allResults = allResults.concat(results);
    });
    
    // Sort allResults
    this.refiners.forEach(function (refiner) {
        allResults = refiner.refine(text, allResults, opt);
    });
    
    return allResults;
};


Chrono.prototype.parseDate = function(text, refDate, opt) {
    var results = this.parse(text, refDate, opt);
    if (results > 0) {
        return results[0].start.date();
    }
    return null;
}

exports.Chrono = Chrono;
exports.options = require('./options');
exports.Parser = require('./parsers/parser').Parser;
exports.Refiner = require('./refiners/refiner').Filter;
exports.Filter = require('./refiners/refiner').Filter;
exports.ParsedResult = require('./result').ParsedResult;
exports.ParsedComponents = require('./result').ParsedComponents;

exports.standard = new Chrono( exports.options.standardOptions() );
exports.casual = new Chrono( exports.options.casualOptions() );

exports.parse = function () {
    return exports.standard.parse.apply(exports.standard, arguments);
}

exports.parseDate = function () {
    return exports.standard.parseDate.apply(exports.standard, arguments);
}
