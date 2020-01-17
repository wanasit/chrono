/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)(сейчас|сегодня|вчера|ночью|прошлым\s*вечером|сегодня ночью|прошлой\s*ночью|(?:завтра|вчера)\s*|послезавтра|позавчера)(?=\W|$)/i;

exports.Parser = function RUCasualDateParser(){

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

        var refMoment = moment(ref);
        var startMoment = refMoment.clone();
        var lowerText = text.toLowerCase();

        if(lowerText === 'сегодня ночью'){
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);

        } else if (/^завтра/.test(lowerText)) {

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(1, 'day');
            }

        } else if (/^послезавтра/.test(lowerText)) {

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment.add(2, 'day');
            }

        } else if (/^позавчера/.test(lowerText)) {

            startMoment.add(-2, 'day');

        } else if (/^вчера/.test(lowerText)) {

            startMoment.add(-1, 'day');

        } else if(lowerText.match(/прошлой\s*ночью/)) {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if(lowerText.match(/прошлым\s*вечером/)) {

            result.start.imply('hour', 15);
            if (refMoment.hour() > 6) {
                startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("сейчас")) {

            result.start.assign('hour', refMoment.hour());
            result.start.assign('minute', refMoment.minute());
            result.start.assign('second', refMoment.second());
            result.start.assign('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['RUCasualDateParser'] = true;
        return result;
    }
}
