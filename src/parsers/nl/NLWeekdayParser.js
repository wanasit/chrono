const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = {
    'zondag': 0, 'zo': 0,
    'maandag': 1, 'ma': 1,
    'dinsdag': 2, 'di': 2,
    'woensdag': 3, 'wo': 3,
    'donderdag': 4, 'do': 4,
    'vrijdag': 5, 'vr': 5,
    'zaterdag': 6, 'za': 6
};

var PATTERN = new RegExp('(\\W|^)' +
    '(?:(?:\\,|\\(|\\（)\\s*)?' +
    '(?:on\\s*?)?' +
    '(?:(deze|afgelopen|vorige|volgende|komende)\\s*(?:week)?\\s*)?' +
    '(' + Object.keys(DAYS_OFFSET).join('|') + ')' +
    '(?:\\s*(?:\\,|\\)|\\）))?' +
    '(?:\\s*(deze|afgelopen|vorige|volgende|komende)\\s*week)?' +
    '(?=\\W|$)', 'i');

var PREFIX_GROUP = 2;
var WEEKDAY_GROUP = 3;
var POSTFIX_GROUP = 4;


exports.updateParsedComponent = function updateParsedComponent(result, ref, offset, modifier) {

    var startMoment = dayjs(ref);
    var startMomentFixed = false;
    var refOffset = startMoment.day();

    if(modifier == 'afgelopen' || modifier == 'vorige') {
        startMoment =startMoment.day(offset - 7);
        startMomentFixed = true;
    } else if(modifier == 'volgende') {
        startMoment = startMoment.day(offset + 7);
        startMomentFixed = true;
    } else if(modifier == 'deze' || modifier == 'komende') {
        startMoment = startMoment.day(offset);
    } else {
        if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset - 7);
        } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
            startMoment = startMoment.day(offset + 7);
        } else {
            startMoment = startMoment.day(offset);
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


exports.Parser = function NLWeekdayParser() {
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
        result.tags['NLWeekdayParser'] = true;

        return result;
    }
};
