/*

    через 5 минут
    через 10 секунд
    через 2 часа
    через 10 дней
    через пол секунды
    через пол часа

*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util = require('../../utils/RU');

var PATTERN = new RegExp('(\\W|^)' +
    '(через|спустя)\\s*' +
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|несколько|одну|один\\s*пол|одну)?\\s*' +
    '((секунда|секунд|секунды|секунду)|(минут|минуту|минуты)|(часов|час|часа)|(дней|день|дня)|(недель|неделю|неделя|недели)|(месяцев|месяц|месяца)|(лет|год|года))' +
    '(?=\\W|$)', 'i'
);

var STRICT_PATTERN = new RegExp('(\\W|^)' +
    '(через|спустя)\\s*' +
    '(' + util.INTEGER_WORDS_PATTERN + '|[0-9]+|одну(?:r|m)?)\\s*' +
    '((секунд|секунду|секунды)|(минут|минуту|минуты)|(часов|часа|час)|(дней|день|дня))\\s*' +
    '(?=\\W|$)', 'i'
);

exports.Parser = function RUDeadlineFormatParser() {
    Parser.apply(this, arguments);

    this.pattern = function () {
        return this.isStrictMode() ? STRICT_PATTERN : PATTERN;
    };

    this.extract = function (text, ref, match, opt) {

        var index = match.index + match[1].length;
        var text = match[0];
        text = match[0].substr(match[1].length, match[0].length - match[1].length);

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        if (match[3]) {
            var num = match[3].toLowerCase();
            if (util.INTEGER_WORDS[num] !== undefined) {
                num = util.INTEGER_WORDS[num];
            } else if (num === 'один' || num === 'одну') {
                num = 1;
            } else if (num === 'несколько') {
                num = 3;
            } else if (/пол/.test(num)) {
                num = 0.5;
            } else {
                num = parseInt(num);
            }
        } else if (/час/i.test(match[4])) {
            num = 1
        }

        var date = moment(ref);
        if (/день|дней|дня|недель|неделю|неделя|недели|месяц|месяцев|год|лет|года/i.test(match[4])) {

            if (/день|дня|дней/i.test(match[4])) {
                date.add(num, 'd');
            } else if (/недель|неделю|неделя|недели/i.test(match[4])) {
                date.add(num * 7, 'd');
            } else if (/месяц|месяцев|месяца/i.test(match[4])) {
                date.add(num, 'month');
            } else if (/год|года|лет/i.test(match[4])) {
                date.add(num, 'year');
            }

            result.start.assign('year', date.year());
            result.start.assign('month', date.month() + 1);
            result.start.assign('day', date.date());
            return result;
        }

        if (/часов|час|часа/i.test(match[4])) {

            date.add(num, 'hour');

        } else if (/минут|минуту|минуты/i.test(match[4])) {

            date.add(num, 'minute');

        } else if (/секунд|секунду|секунды/i.test(match[4])) {

            date.add(num, 'second');
        }

        result.start.imply('year', date.year());
        result.start.imply('month', date.month() + 1);
        result.start.imply('day', date.date());
        result.start.imply('hour', date.hour());
        result.start.imply('minute', date.minute());
        result.start.imply('second', date.second());
        result.tags['RUDeadlineFormatParser'] = true;
        return result;
    };
};