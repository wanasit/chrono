var parser = require('./parsers/parser');
var refiner = require('./refiners/refiner');


exports.mergeOptions = function(options) {

    var addedTypes = {};
    var mergedOption = {
        parsers: [],
        refiners: []
    };

    options.forEach(function (option) {

        if (option.call) {
            option = option.call();
        }

        if (option.parsers) {
            option.parsers.forEach(function (p) {
                if (!addedTypes[p.constructor]) {
                    mergedOption.parsers.push(p);
                    addedTypes[p.constructor] = true;
                }
            });
        }

        if (option.refiners) {
            option.refiners.forEach(function (r) {
                if (!addedTypes[r.constructor]) {
                    mergedOption.refiners.push(r);
                    addedTypes[r.constructor] = true;
                }
            });
        }
    });

    return mergedOption;
};


exports.commonPostProcessing = function() {
    return {
        refiners: [
            // These should be after all other refiners
            new refiner.ExtractTimezoneOffsetRefiner(),
            new refiner.ExtractTimezoneAbbrRefiner(),
            new refiner.UnlikelyFormatFilter()
        ]
    }
};


// -------------------------------------------------------------

exports.strictOption = function () {
    return exports.mergeOptions([
        exports.en(true),

        exports.de(true),
        exports.es(true),
        exports.fr(true),
        exports.ja(true),
        exports.zh,
        exports.commonPostProcessing
    ]);
};

exports.casualOption = function () {
    return exports.mergeOptions([
        exports.en.casual,

        exports.de(true),
        exports.es.casual,
        exports.fr.casual,
        exports.ja.casual,
        exports.zh,
        exports.commonPostProcessing
    ]);
};

// -------------------------------------------------------------

exports.de = function(strictMode) {
    return {
        parsers: [
            new parser.DEDeadlineFormatParser(strictMode),
            new parser.DEMonthNameLittleEndianParser(strictMode),
            new parser.DEMonthNameParser(strictMode),
            new parser.DESlashDateFormatParser(strictMode),
            new parser.DETimeAgoFormatParser(strictMode),
            new parser.DETimeExpressionParser(strictMode)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.DEMergeDateTimeRefiner(),
            new refiner.DEMergeDateRangeRefiner()
        ]
    }
};

exports.de.casual = function() {
    var option = exports.de(false);
    option.parsers.unshift(new parser.DECasualDateParser());
    option.parsers.unshift(new parser.DEWeekdayParser());
    return option;
};



// -------------------------------------------------------------


exports.en = function(strictMode) {
    return {
        parsers: [
            new parser.ENISOFormatParser(strictMode),
            new parser.ENDeadlineFormatParser(strictMode),
            new parser.ENMonthNameLittleEndianParser(strictMode),
            new parser.ENMonthNameMiddleEndianParser(strictMode),
            new parser.ENMonthNameParser(strictMode),
            new parser.ENSlashDateFormatParser(strictMode),
            new parser.ENSlashDateFormatStartWithYearParser(strictMode),
            new parser.ENSlashMonthFormatParser(strictMode),
            new parser.ENTimeAgoFormatParser(strictMode),
            new parser.ENTimeExpressionParser(strictMode)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),

            // English
            new refiner.ENMergeDateTimeRefiner(),
            new refiner.ENMergeDateRangeRefiner(),
            new refiner.ENPrioritizeSpecificDateRefiner()
        ]
    }
};

exports.en.casual = function() {
    var option = exports.en(false);

    // EN
    option.parsers.unshift(new parser.ENCasualDateParser());
    option.parsers.unshift(new parser.ENCasualTimeParser());
    option.parsers.unshift(new parser.ENWeekdayParser());
    option.parsers.unshift(new parser.ENRelativeDateFormatParser());
    return option;
};

// -------------------------------------------------------------

exports.ja = function() {
    return {
        parsers: [
            new parser.JPStandardParser()
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.JPMergeDateRangeRefiner()
        ]
    }
};

exports.ja.casual = function() {
    var option = exports.ja();
    option.parsers.unshift(new parser.JPCasualDateParser());
    return option;
};


// -------------------------------------------------------------


exports.es = function(strictMode) {
    return {
        parsers: [
            new parser.ESTimeAgoFormatParser(strictMode),
            new parser.ESDeadlineFormatParser(strictMode),
            new parser.ESTimeExpressionParser(strictMode),
            new parser.ESMonthNameLittleEndianParser(strictMode),
            new parser.ESSlashDateFormatParser(strictMode)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};

exports.es.casual = function() {
    var option = exports.es(false);
    option.parsers.unshift(new parser.ESCasualDateParser());
    option.parsers.unshift(new parser.ESWeekdayParser());
    return option;
};


// -------------------------------------------------------------

exports.fr = function(strictMode) {
    return {
        parsers: [
            new parser.FRDeadlineFormatParser(strictMode),
            new parser.FRMonthNameLittleEndianParser(strictMode),
            new parser.FRSlashDateFormatParser(strictMode),
            new parser.FRTimeAgoFormatParser(strictMode),
            new parser.FRTimeExpressionParser(strictMode)
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner(),
            new refiner.FRMergeDateRangeRefiner(),
            new refiner.FRMergeDateTimeRefiner()
        ]
    }
};

exports.fr.casual = function() {
    var option = exports.fr(false);
    option.parsers.unshift(new parser.FRCasualDateParser());
    option.parsers.unshift(new parser.FRWeekdayParser());
    return option;
};


// -------------------------------------------------------------

exports.zh = function() {
    return {
        parsers: [
            new parser.ZHHantDateParser(),
            new parser.ZHHantWeekdayParser(),
            new parser.ZHHantTimeExpressionParser(),
            new parser.ZHHantCasualDateParser(),
            new parser.ZHHantDeadlineFormatParser()
        ],
        refiners: [
            new refiner.OverlapRemovalRefiner(),
            new refiner.ForwardDateRefiner()
        ]
    }
};