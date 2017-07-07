/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/EN');

var TIME_UNIT = 
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|an?(?:\\s*few)?|half(?:\\s*an?)?)\\s*' +
    '(sec(?:onds?)?|min(?:ute)?s?|hours?|weeks?|days?|months?|years?)\\s*';

var TIME_UNIT_STRICT = 
    '([0-9]+|an?)\\s*' +
    '(seconds?|minutes?|hours?|days?)\\s*';

var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');
var PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '((?:' + TIME_UNIT + ')+)' +
    '(?:ago|before|earlier)(?=(?:\\W|$))', 'i');

var STRICT_PATTERN = new RegExp('' +
    '(\\W|^)' +
    '(?:within\\s*)?' +
    '((?:' + TIME_UNIT_STRICT + ')+)' +
    'ago(?=(?:\\W|$))', 'i');

exports.Parser = function ENTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return this.isStrictMode()? STRICT_PATTERN : PATTERN;
    };

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var fragments = extractDateTimeUnitFragments(match[2]);
        var date = moment(ref);

        for (var key in fragments) {
            date.add(-fragments[key], key);
        }

        if (fragments['hour'] > 0 || fragments['minute'] > 0 || fragments['second'] > 0) {
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.start.assign('second', date.second());
            result.tags['ENTimeAgoFormatParser'] = true;
        } 
        
        if (fragments['d'] > 0 || fragments['month'] > 0 || fragments['year'] > 0) {
            result.start.assign('day', date.date());
            result.start.assign('month', date.month() + 1);
            result.start.assign('year', date.year());
        } else {
            if (fragments['week'] > 0) {
                result.start.imply('weekday', date.day());
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
        }

        return result;
    };

    function extractDateTimeUnitFragments(timeunitText) {
        var fragments = {};
        var remainingText = timeunitText;
        var match = PATTERN_TIME_UNIT.exec(remainingText);
        while (match) {
            collectDateTimeFragment(match, fragments);
            remainingText = remainingText.substring(match[0].length);
            match = PATTERN_TIME_UNIT.exec(remainingText);
        }
        return fragments;
    };

    function collectDateTimeFragment(match, fragments) {

        var num = match[1].toLowerCase() ;
        if (util.INTEGER_WORDS[num] !== undefined) {
            num = util.INTEGER_WORDS[num];
        } else if(num === 'a' || num === 'an'){
            num = 1;
        } else if (num.match(/few/)) {
            num = 3;
        } else if (num.match(/half/)) {
            num = 0.5;
        } else {
            num = parseInt(num);
        }

        if (match[2].match(/hour/i)) {
            fragments['hour'] = num;
        } else if (match[2].match(/min/i)) {
            fragments['minute'] = num;
        } else if (match[2].match(/sec/i)) {
            fragments['second'] = num;
        } else if (match[2].match(/week/i)) {
            fragments['week'] = num;
        } else if (match[2].match(/day/i)) {
            fragments['d'] = num;
        } else if (match[2].match(/month/i)) {
            fragments['month'] = num;
        } else if (match[2].match(/year/i)) {
            fragments['year'] = num;
        }

        return fragments;
    }

}
