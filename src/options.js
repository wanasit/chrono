var ENISOFormatParser = require('./parsers/EN/ENISOFormatParser').Parser;
var ENDeadlineFormatParser = require('./parsers/EN/ENDeadlineFormatParser').Parser;
var ENMonthNameLittleEndianParser = require('./parsers/EN/ENMonthNameLittleEndianParser').Parser;
var ENMonthNameMiddleEndianParser = require('./parsers/EN/ENMonthNameMiddleEndianParser').Parser;
var ENSlashDateFormatParser = require('./parsers/EN/ENSlashDateFormatParser').Parser;
var ENTimeAgoFormatParser = require('./parsers/EN/ENTimeAgoFormatParser').Parser;
var ENTimeExpessionParser = require('./parsers/EN/ENTimeExpressionParser').Parser;
var ENWeekdayParser = require('./parsers/EN/ENWeekdayParser').Parser;
var ENCasualDateParser = require('./parsers/EN/ENCasualDateParser').Parser;

var ENMergeDateTimeRefiner = require('./refiners/EN/ENMergeDateTimeRefiner').Refiner;
var ENMergeDateRangeRefiner = require('./refiners/EN/ENMergeDateRangeRefiner').Refiner;

var OverlapRemovalRefiner = require('./refiners/OverlapRemovalRefiner').Refiner;
var ExtractTimezoneOffsetRefiner = require('./refiners/ExtractTimezoneOffsetRefiner').Refiner;
var ExtractTimezoneAbbrRefiner = require('./refiners/ExtractTimezoneAbbrRefiner').Refiner;

exports.standardOptions = function () {
    return {
        parsers: [
        	new ENISOFormatParser(),
            new ENDeadlineFormatParser(),
            new ENMonthNameLittleEndianParser(),
            new ENMonthNameMiddleEndianParser(),
            new ENSlashDateFormatParser(),
            new ENTimeAgoFormatParser(),           
            new ENTimeExpessionParser(),
        ],
        refiners: [
            new ENMergeDateTimeRefiner(),
            new ENMergeDateRangeRefiner(),
            new ExtractTimezoneOffsetRefiner(),
            new ExtractTimezoneAbbrRefiner(),
            new OverlapRemovalRefiner(),
        ]
    }
};


exports.casualOptions = function () {

    var options = exports.standardOptions();
    options.parsers.push(new ENCasualDateParser());
    options.parsers.push(new ENWeekdayParser());
    // options.parsers.add(new ENWeekExpressionParser());
    // options.parsers.add(new JPCasualDateExpressionParser());

    // options.refiners.add(2, new ENMergeWeekdayRefiner());
    
    return options;
};
