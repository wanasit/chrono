const parser = require('../parser');
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/NL');

var PATTERN = new RegExp('(\\W|^)' +
        '(?:op\\s*?)?' +
        '(?:'+ '(' + util.WEEKDAY_PATTERN + ')' + '\\s*,?\\s*)?' +
        '([0-9]{1,2})\.?' +
        '(?:\\s*(?:tot|\\-|\\–|tot en met|t\\/m)\\s*([0-9]{1,2})\.?)?\\s*' +
        '(' + util.MONTH_PATTERN + ')' +
        '(?:' +
            '(?:-|\/|,?\\s*)' +
            '((?:' +
                '[1-9][0-9]{0,3}\\s*(?:BE|n\.Chr\.|v\.Chr\.)|' +
                '[1-2][0-9]{3}|' +
                '[5-9][0-9]' +
            ')(?![^\\s]\\d))' +
        ')?' +
        '(?=\\W|$)', 'i'
    );
var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;

exports.Parser = function ENMonthNameLittleEndianParser(){
    parser.Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];

            if (/BE/i.test(year)) {
                // Buddhist Era
                year = year.replace(/BE/i, '');
                year = parseInt(year) - 543;
            } else if (/v\.Chr\./i.test(year)){
                // Before Christ
                year = year.replace(/v\.Chr\./i, '');
                year = -parseInt(year);
            } else if (/n\.Chr\./i.test(year)){
                year = year.replace(/n\.Chr\./i, '');
                year = parseInt(year);
            } else {
                year = parseInt(year);
                if (year < 100){
                    if (year > 50) {
                        year = year + 1900;
                    } else {
                        year = year + 2000;
                    }
                }
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            year = parser.findYearClosestToRef(ref, day, month);
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', year);
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()];
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 januari 2012'
        if (match[DATE_TO_GROUP]) {
            var endDate = parseInt(match[DATE_TO_GROUP]);
            result.end = result.start.clone();
            result.end.assign('day', endDate);
        }

        result.tags['NLMonthNameLittleEndianParser'] = true;
        return result;
    };
};
