const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(dentro\s*de|em|em*até)\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|dias?)\s*(?=(?:\W|$))/i;

exports.Parser = function PTDeadlineFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[3]);
        if (isNaN(num)) {
          if (match[3].match(/(meio|meia)/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = dayjs(ref);
        if (match[4].match(/dia/)) {
            date = date.add(num, 'd');

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }


        if (match[4].match(/hora/)) {

            date = date.add(num, 'hour');

        } else if (match[4].match(/minuto/)) {

            date = date.add(num, 'minute');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.assign('hour', date.hour());
        result.start.assign('minute', date.minute());
        result.tags['PTDeadlineFormatParser'] = true;
        return result;
    };
}
