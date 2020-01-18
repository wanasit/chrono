/*


*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'воскресенье': 0, 'вс.': 0, 'понедельник': 1, 'пн.': 1,'вторник': 2, 'вт.':2, 'среда': 3, 'среду': 3, 'ср.': 3,
    'четверг': 4, 'чт.':4, 'пятница': 5, 'пятницу': 5, 'пт.': 5,'суббота': 6,'субботу': 6, 'сб.': 6};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:в\\s*?)?' +
    '(?:(эту|это|этот|прошлый|прошлую|прошлое|прошлая|следующий|следующую|следующее|следующая)\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(этой|прошлой|следующей)\\s*недели)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;


exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {

    var startMoment = moment(ref);
    var startMomentFixed = false;
    var refOffset = startMoment.day();

    if(modifier == 'прошлый' || modifier == 'прошлую' || modifier == 'прошлое' || modifier == 'прошлая' ) {
        startMoment.day(offset - 7);
        startMomentFixed = true;
    } else if(modifier == 'следующий' || modifier == 'следующую' || modifier == 'следующее'|| modifier == 'следующая') {
        startMoment.day(offset + 7);
        startMomentFixed = true;
    } else if(modifier == 'эту'||modifier == 'это' || modifier == 'этот') {
        startMoment.day(offset);
    } else {
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment.day(offset + 7);
        } else {
            startMoment.day(offset);
        }
    }

    result.start.assign('weekday', offset);
    if (startMomentFixed) {
        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
        result.start.assign('year', startMoment.year());
    } else {
        result.start.imply('day', startMoment.date());
        result.start.imply('month', startMoment.month() + 1);
        result.start.imply('year', startMoment.year());
    }

    return result;
};


exports.Parser = function RUWeekdayParser() {
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });

        var dayOfWeek = match[WEEKDAY_GROUP].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) {
            return null;
        }

        var prefix = match[PREFIX_GROUP];
        var postfix = match[POSTFIX_GROUP];
        var norm = prefix || postfix;
        norm = norm || '';
        norm = norm.toLowerCase();

        exports.updateParsedComponent(result, ref, offset, norm);
        result.tags['RUWeekdayParser'] = true;

        return result;
    }
};
