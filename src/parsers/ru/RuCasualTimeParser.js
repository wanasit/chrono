/*

w
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((утром|обед|в полдень|вечером|в полночь|ночью|ночь))/i;

var TIME_MATCH = 4;

exports.Parser = function RUCasualTimeParser(){

    Parser.apply(this, arguments);


    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        if(!match[TIME_MATCH]) TIME_MATCH = 3;

        switch (match[TIME_MATCH].toLowerCase()) {

            case 'обед':
                result.start.imply('meridiem', 1);
                result.start.imply('hour', 15);
                break;

            case 'вечером':
            case 'ночью':
                result.start.imply('meridiem', 1);
                result.start.imply('hour', 22);
                break;

            case 'утром':
                result.start.imply('meridiem', 0);
                result.start.imply('hour', 6);
                break;

            case 'в полдень':
                result.start.imply('meridiem', 0);
                result.start.imply('hour', 12);
                break;

            case 'в полночь':
            case 'ночь':
                result.start.imply('meridiem', 1);
                result.start.imply('hour', 24);
                break;
        }

        result.tags['RUCasualTimeParser'] = true;
        return result;
    };
};
