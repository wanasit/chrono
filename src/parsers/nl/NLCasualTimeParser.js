var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((deze)?\s*('s morgens|'s ochtends|in de ochtend|'s middags|in de middag|'s avonds|in de avond|'s nachts|ochtend|tussen de middag|middag|avond|nacht))/i;

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

        switch (match[TIME_MATCH].toLowerCase()) {
            case 'middag':
            case 'in de middag':
            case '\'s middags':
                result.start.imply('meridiem', 1);
                result.start.imply('hour', 15);
                break;

            case 'avond':
            case 'in de avond':
            case '\'s avonds':
                result.start.imply('meridiem', 1);
                result.start.imply('hour', 20);
                break;

            case 'middernacht':
            case 'nacht':
            case '\'s nachts':
                result.start.imply('meridiem', 0);
                result.start.imply('hour', 0);
                break;

            case 'ochtend':
            case '\s morgens':
            case '\s ochtends':
            case 'in de ochtend':
                result.start.imply('meridiem', 0);
                result.start.imply('hour', 9);
                break;

            case 'tussen de middag':
                result.start.imply('meridiem', 0);
                result.start.imply('hour', 12);
                break;
        }

        result.tags['NLCasualTimeParser'] = true;
        return result;
    };
};
