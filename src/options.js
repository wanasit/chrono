var ENISOFormatParser = require('./parsers/EN/ENISOFormatParser').Parser;
var ENDeadlineFormatParser = require('./parsers/EN/ENDeadlineFormatParser').Parser;
var ENMonthNameLittleEndianParser = require('./parsers/EN/ENMonthNameLittleEndianParser').Parser;
var ENMonthNameMiddleEndianParser = require('./parsers/EN/ENMonthNameMiddleEndianParser').Parser;
var ENSlashDateFormatParser = require('./parsers/EN/ENSlashDateFormatParser').Parser;
var ENSlashDateFormatStartWithYearParser = require('./parsers/EN/ENSlashDateFormatStartWithYearParser').Parser;
var ENTimeAgoFormatParser = require('./parsers/EN/ENTimeAgoFormatParser').Parser;
var ENTimeExpessionParser = require('./parsers/EN/ENTimeExpressionParser').Parser;
var ENWeekdayParser = require('./parsers/EN/ENWeekdayParser').Parser;
var ENCasualDateParser = require('./parsers/EN/ENCasualDateParser').Parser;

var ENMergeDateTimeRefiner = require('./refiners/EN/ENMergeDateTimeRefiner').Refiner;
var ENMergeDateRangeRefiner = require('./refiners/EN/ENMergeDateRangeRefiner').Refiner;


var JPStandardParser = require('./parsers/JP/JPStandardParser').Parser;
var JPCasualDateParser = require('./parsers/JP/JPCasualDateParser').Parser;

var JPMergeDateRangeRefiner = require('./refiners/JP/JPMergeDateRangeRefiner').Refiner;


var OverlapRemovalRefiner = require('./refiners/OverlapRemovalRefiner').Refiner;
var ExtractTimezoneOffsetRefiner = require('./refiners/ExtractTimezoneOffsetRefiner').Refiner;
var ExtractTimezoneAbbrRefiner = require('./refiners/ExtractTimezoneAbbrRefiner').Refiner;
var UnlikelyFormatFilter = require('./refiners/UnlikelyFormatFilter').Refiner;


function baseOption(strictMode) {

    return {
        parsers: [
        
            // EN
            new ENISOFormatParser(strictMode),
            new ENDeadlineFormatParser(strictMode),
            new ENMonthNameLittleEndianParser(strictMode),
            new ENMonthNameMiddleEndianParser(strictMode),
            new ENSlashDateFormatParser(strictMode),
            new ENSlashDateFormatStartWithYearParser(strictMode),
            new ENTimeAgoFormatParser(strictMode),           
            new ENTimeExpessionParser(strictMode),

            // JP
            new JPStandardParser(strictMode),
        ],

        refiners: [
            // Removing overlaping first
            new OverlapRemovalRefiner(),
            
            // ETC
            new ENMergeDateTimeRefiner(),
            new ENMergeDateRangeRefiner(),
            new JPMergeDateRangeRefiner(),

            // Extract additional info later
            new ExtractTimezoneOffsetRefiner(),
            new ExtractTimezoneAbbrRefiner(),
            new UnlikelyFormatFilter()
        ]
    }
}



exports.strictOption = function () {
    return baseOption(true);
};


exports.casualOption = function () {

    var options = baseOption(false);
    
    // EN
    options.parsers.unshift(new ENCasualDateParser());
    options.parsers.unshift(new ENWeekdayParser());

    // JP
    options.parsers.unshift(new JPCasualDateParser());
    
    return options;
};
