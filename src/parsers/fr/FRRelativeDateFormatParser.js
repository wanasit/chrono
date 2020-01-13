const quarterOfYear = require('dayjs/plugin/quarterOfYear');
const dayjs = require('dayjs');
dayjs.extend(quarterOfYear);

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/FR');

var PATTERN = new RegExp('(\\W|^)' +
    '(?:les?|la|l\'|du|des?)\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|\\d+)?\\s*' +
    '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?\\s*' +
    '(secondes?|min(?:ute)?s?|heures?|jours?|semaines?|mois|trimestres?|années?)\\s*' +
    '(prochaine?s?|derni[eè]re?s?|pass[ée]e?s?|pr[ée]c[ée]dents?|suivante?s?)?' +
    '(?=\\W|$)', 'i'
);

var MULTIPLIER_GROUP = 2;
var MODIFIER_1_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;
var MODIFIER_2_GROUP = 5;

exports.Parser = function FRRelativeDateFormatParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; };

    this.extract = function(text, ref, match, opt){
        var index = match.index + match[1].length;
        var text  = match[0];
        text  = match[0].substr(match[1].length, match[0].length - match[1].length);

        // Multiplier
        var multiplier = match[MULTIPLIER_GROUP] === undefined ? '1' : match[MULTIPLIER_GROUP];
        if (util.INTEGER_WORDS[multiplier] !== undefined) {
            multiplier = util.INTEGER_WORDS[multiplier];
        } else {
            multiplier = parseInt(multiplier);
        }

        // Modifier
        var modifier = match[MODIFIER_1_GROUP] === undefined ?
                    (match[MODIFIER_2_GROUP] === undefined ? '' : match[MODIFIER_2_GROUP].toLowerCase())
                     : match[MODIFIER_1_GROUP].toLowerCase();
        if(!modifier) {
            // At least one modifier is mandatory to match this parser
            return;
        }

        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref
        });
        result.tags['FRRelativeDateFormatParser'] = true;

        var modifierFactor;
        switch(true) {
            case /prochaine?s?/.test(modifier):
            case /suivants?/.test(modifier):
                modifierFactor = 1;
                break;
            case /derni[eè]re?s?/.test(modifier):
            case /pass[ée]e?s?/.test(modifier):
            case /pr[ée]c[ée]dents?/.test(modifier):
                modifierFactor = -1;
                break;
        }

        var total = multiplier * modifierFactor;

        var dateFrom = dayjs(ref);
        var dateTo = dayjs(ref);

        var relative = match[RELATIVE_WORD_GROUP];
        var startOf;
        switch(true) {
            case /secondes?/.test(relative):
                dateFrom = dateFrom.add(total, 's');
                dateTo = dateTo.add(modifierFactor, 's');
                startOf = 'second';
                break;
            case /min(?:ute)?s?/.test(relative):
                dateFrom = dateFrom.add(total, 'm');
                dateTo = dateTo.add(modifierFactor, 'm');
                startOf = 'minute';
                break;
            case /heures?/.test(relative):
                dateFrom = dateFrom.add(total, 'h');
                dateTo = dateTo.add(modifierFactor, 'h');
                startOf = 'hour';
                break;
            case /jours?/.test(relative):
                dateFrom = dateFrom.add(total, 'd');
                dateTo = dateTo.add(modifierFactor, 'd');
                startOf = 'day';
                break;
            case /semaines?/.test(relative):
                dateFrom = dateFrom.add(total, 'w');
                dateTo = dateTo.add(modifierFactor, 'w');
                startOf = 'week';
                break;
            case /mois?/.test(relative):
                dateFrom = dateFrom.add(total, 'M');
                dateTo = dateTo.add(modifierFactor, 'M');
                startOf = 'month';
                break;
            case /trimestres?/.test(relative):
                dateFrom = dateFrom.add(total, 'Q');
                dateTo = dateTo.add(modifierFactor, 'Q');
                startOf = 'quarter';
                break;
            case /années?/.test(relative):
                dateFrom = dateFrom.add(total, 'y');
                dateTo = dateTo.add(modifierFactor, 'y');
                startOf = 'year';
                break;
        }

        // if we go forward, switch the start and end dates
        if(modifierFactor > 0) {
            var dateTmp = dateFrom;
            dateFrom = dateTo;
            dateTo = dateTmp;
        }

        // Get start and end of dates
        dateFrom = dateFrom.startOf(startOf);
        dateTo = dateTo.endOf(startOf);
        if (startOf == 'week') { // Weekday in FR start on Sat?
            dateFrom = dateFrom.add(1, 'd')
            dateTo = dateTo.add(1, 'd')
        }
        

        // Assign results
        result.start.assign('year', dateFrom.year());
        result.start.assign('month', dateFrom.month() + 1);
        result.start.assign('day', dateFrom.date());
        result.start.assign('minute', dateFrom.minute());
        result.start.assign('second', dateFrom.second());
        result.start.assign('hour', dateFrom.hour());
        result.start.assign('millisecond', dateFrom.millisecond());

        result.end = result.start.clone();
        result.end.assign('year', dateTo.year());
        result.end.assign('month', dateTo.month() + 1);
        result.end.assign('day', dateTo.date());
        result.end.assign('minute', dateTo.minute());
        result.end.assign('second', dateTo.second());
        result.end.assign('hour', dateTo.hour());
        result.end.assign('millisecond', dateTo.millisecond());
        return result;
    };
};
