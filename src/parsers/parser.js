const dayjs = require('dayjs');

exports.Parser = function (config) {

    config = config || {};
    var strictMode = config.strict;

    this.isStrictMode = function() { return (strictMode == true) };

    this.pattern = function() { return /./i; }

    this.extract = function(text, ref, match, opt){ return null; }

    this.execute = function(text, ref, opt) {

        var results = [];
        var regex = this.pattern();

        var remainingText = text;
        var match = regex.exec(remainingText);

        while (match) {

            // Calculate match index on the full text;
            match.index += text.length - remainingText.length;

            var result = this.extract(text, ref, match, opt);
            if (result) {

                // If success, start from the end of the result
                remainingText = text.substring(result.index + result.text.length);

                if (!this.isStrictMode() || result.hasPossibleDates()) {
                    results.push(result);
                }

            } else {
                // If fail, move on by 1
                remainingText = text.substring(match.index + 1);
            }

            match = regex.exec(remainingText);
        }

        if (this.refiners) {
            this.refiners.forEach(function () {
                results = refiner.refine(results, text, options);
            });
        }

        return results;
    }
}

exports.findYearClosestToRef = function (ref, day, month) {
    //Find the most appropriated year
    const refMoment = dayjs(ref);
    var dateMoment = refMoment;
    dateMoment = dateMoment.month(month - 1);
    dateMoment = dateMoment.date(day);
    dateMoment = dateMoment.year(refMoment.year())

    const nextYear = dateMoment.add(1, 'y');
    const lastYear = dateMoment.add(-1, 'y');
    if( Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment)) ){
        dateMoment = nextYear;
    }
    else if( Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment)) ){
        dateMoment = lastYear;
    }

    return dateMoment.year();
}

exports.ENISOFormatParser = require('./en/ENISOFormatParser').Parser;
exports.ENDeadlineFormatParser = require('./en/ENDeadlineFormatParser').Parser;
exports.ENRelativeDateFormatParser = require('./en/ENRelativeDateFormatParser').Parser;
exports.ENMonthNameLittleEndianParser = require('./en/ENMonthNameLittleEndianParser').Parser;
exports.ENMonthNameMiddleEndianParser = require('./en/ENMonthNameMiddleEndianParser').Parser;
exports.ENMonthNameParser = require('./en/ENMonthNameParser').Parser;
exports.ENSlashDateFormatParser = require('./en/ENSlashDateFormatParser').Parser;
exports.ENSlashDateFormatStartWithYearParser = require('./en/ENSlashDateFormatStartWithYearParser').Parser;
exports.ENSlashMonthFormatParser = require('./en/ENSlashMonthFormatParser').Parser;
exports.ENTimeAgoFormatParser = require('./en/ENTimeAgoFormatParser').Parser;
exports.ENTimeExpressionParser = require('./en/ENTimeExpressionParser').Parser;
exports.ENTimeLaterFormatParser = require('./en/ENTimeLaterFormatParser').Parser;
exports.ENWeekdayParser = require('./en/ENWeekdayParser').Parser;
exports.ENCasualDateParser = require('./en/ENCasualDateParser').Parser;
exports.ENCasualTimeParser = require('./en/ENCasualTimeParser').Parser;

exports.JPStandardParser = require('./ja/JPStandardParser').Parser;
exports.JPCasualDateParser = require('./ja/JPCasualDateParser').Parser;

exports.PTCasualDateParser = require('./pt/PTCasualDateParser').Parser;
exports.PTDeadlineFormatParser = require('./pt/PTDeadlineFormatParser').Parser;
exports.PTMonthNameLittleEndianParser = require('./pt/PTMonthNameLittleEndianParser').Parser;
exports.PTSlashDateFormatParser = require('./pt/PTSlashDateFormatParser').Parser;
exports.PTTimeAgoFormatParser = require('./pt/PTTimeAgoFormatParser').Parser;
exports.PTTimeExpressionParser = require('./pt/PTTimeExpressionParser').Parser;
exports.PTWeekdayParser = require('./pt/PTWeekdayParser').Parser;

exports.ESCasualDateParser = require('./es/ESCasualDateParser').Parser;
exports.ESDeadlineFormatParser = require('./es/ESDeadlineFormatParser').Parser;
exports.ESTimeAgoFormatParser = require('./es/ESTimeAgoFormatParser').Parser;
exports.ESTimeExpressionParser = require('./es/ESTimeExpressionParser').Parser;
exports.ESWeekdayParser = require('./es/ESWeekdayParser').Parser;
exports.ESMonthNameLittleEndianParser = require('./es/ESMonthNameLittleEndianParser').Parser;
exports.ESSlashDateFormatParser = require('./es/ESSlashDateFormatParser').Parser;

exports.FRCasualDateParser = require('./fr/FRCasualDateParser').Parser;
exports.FRDeadlineFormatParser = require('./fr/FRDeadlineFormatParser').Parser;
exports.FRMonthNameLittleEndianParser = require('./fr/FRMonthNameLittleEndianParser').Parser;
exports.FRSlashDateFormatParser = require('./fr/FRSlashDateFormatParser').Parser;
exports.FRTimeAgoFormatParser = require('./fr/FRTimeAgoFormatParser').Parser;
exports.FRTimeExpressionParser = require('./fr/FRTimeExpressionParser').Parser;
exports.FRWeekdayParser = require('./fr/FRWeekdayParser').Parser;
exports.FRRelativeDateFormatParser = require('./fr/FRRelativeDateFormatParser').Parser;

exports.ZHHantDateParser = require('./zh-Hant/ZHHantDateParser').Parser;
exports.ZHHantWeekdayParser = require('./zh-Hant/ZHHantWeekdayParser').Parser;
exports.ZHHantTimeExpressionParser = require('./zh-Hant/ZHHantTimeExpressionParser').Parser;
exports.ZHHantCasualDateParser = require('./zh-Hant/ZHHantCasualDateParser').Parser;
exports.ZHHantDeadlineFormatParser = require('./zh-Hant/ZHHantDeadlineFormatParser').Parser;

exports.DEDeadlineFormatParser = require('./de/DEDeadlineFormatParser').Parser;
exports.DEMonthNameLittleEndianParser = require('./de/DEMonthNameLittleEndianParser').Parser;
exports.DEMonthNameParser = require('./de/DEMonthNameParser').Parser;
exports.DESlashDateFormatParser = require('./de/DESlashDateFormatParser').Parser;
exports.DETimeAgoFormatParser = require('./de/DETimeAgoFormatParser').Parser;
exports.DETimeExpressionParser = require('./de/DETimeExpressionParser').Parser;
exports.DEWeekdayParser = require('./de/DEWeekdayParser').Parser;
exports.DECasualDateParser = require('./de/DECasualDateParser').Parser;

exports.NLMonthNameParser = require('./nl/NLMonthNameParser').Parser;
exports.NLMonthNameLittleEndianParser = require('./nl/NLMonthNameLittleEndianParser').Parser;
exports.NLSlashDateFormatParser = require('./nl/NLSlashDateFormatParser').Parser;
exports.NLWeekdayParser = require('./nl/NLWeekdayParser').Parser;
exports.NLTimeExpressionParser = require('./nl/NLTimeExpressionParser').Parser;
exports.NLCasualDateParser = require('./nl/NLCasualDateParser').Parser;
exports.NLCasualTimeParser = require('./nl/NLCasualTimeParser').Parser;
