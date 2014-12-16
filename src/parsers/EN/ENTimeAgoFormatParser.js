/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(?:within\s*)?([0-9]+)\s*(minutes?|hours?|days?)\s*ago(?=(?:\W|$))/i;

exports.Parser = function ENTimeAgoFormatParser(){
    Parser.call(this);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = match[2];
        num = parseInt(num);

        var date = moment(ref);
        if (match[3].match(/day/)) {

            impliedComponents = []
            date.add(-num, 'd');

            result.start.assign('day', date.date());
            result.start.assign('month', date.month() + 1);
            result.start.assign('year', date.year());
            return result;
        }


        if (match[3].match(/hour/)) {

            date.add(-num, 'hour');

        } else if (match[3].match(/minute/)) {

            date.add(-num, 'minute');
        }

        result.start.imply('day', date.date());
        result.start.imply('month', date.month() + 1);
        result.start.imply('year', date.year());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.tags['ENTimeAgoFormatParser'] = true;
        return result;
    };
}
