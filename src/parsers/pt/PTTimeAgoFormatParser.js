const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)há\s*([0-9]+|mei[oa]|uma?)\s*(minutos?|horas?|semanas?|dias?|mes(es)?|anos?)(?=(?:\W|$))/i;

exports.Parser = function PTTimeAgoFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() {
        return PATTERN;
    }

    this.extract = function(text, ref, match, opt){

        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var text = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);
        let index = match.index + match[1].length;

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var num = parseInt(match[2]);
        if (isNaN(num)) {
          if (match[2].match(/mei/)) {
            num = 0.5;
          } else {
            num = 1;
          }
        }

        var date = dayjs(ref);

        if (match[3].match(/hora/) || match[3].match(/minuto/)) {
            if (match[3].match(/hora/)) {

                date = date.add(-num, 'hour');

            } else if (match[3].match(/minuto/)) {

                date = date.add(-num, 'minute');
            }

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.assign('hour', date.hour());
            result.start.assign('minute', date.minute());
            result.tags['PTTimeAgoFormatParser'] = true;
            return result;
        }

        if (match[3].match(/semana/)) {
            date = date.add(-num, 'week');

            result.start.imply('day', date.date());
            result.start.imply('month', date.month() + 1);
            result.start.imply('year', date.year());
            result.start.imply('weekday', date.day());
            return result;
        }

        if (match[3].match(/dia/)) {
            date = date.add(-num, 'd');
        }

        if (match[3].match(/mes/)) {
            date = date.add(-num, 'month');
        }

        if (match[3].match(/ano/)) {

            date = date.add(-num, 'year');
        }

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());
        return result;

    };
}
