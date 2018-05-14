/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((this)?\s*(morning|afternoon|evening|noon|night))/i;

var TIME_MATCH = 4;

exports.Parser = function ENCasualTimeParser(){

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

        if (match[TIME_MATCH] == "afternoon") {
            result.start.assign('meridiem',1);
            result.start.imply('hour', opt['afternoon'] ? opt['afternoon']: 15);
        } else if (match[TIME_MATCH] == "evening") {
            result.start.assign('meridiem',1);    
            result.start.imply('hour', opt['evening'] ? opt['evening'] : 18);
        } else if (match[TIME_MATCH] == "morning") {
            result.start.assign('meridiem',0); 
            result.start.imply('hour', opt['morning'] ? opt['morning'] : 6);
        } else if (match[TIME_MATCH] == "noon") {
            result.start.assign('meridiem',1);
            result.start.imply('hour', opt['noon'] ? opt['noon'] : 12);
        } else if (match[TIME_MATCH] == "night") {
            result.start.assign('meridiem',1);
            result.start.imply('hour', opt['night'] ? opt['night'] : 21);
        }

        result.tags['ENCasualTimeParser'] = true;
        return result;
    };
};
