var dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp(
    '(\\W|^)(' +
        'nu|' +
        'vroeg in de ochtend|'+
        '(?:van|deze)\\s*(morgen|ochtend|middag|avond)|' +
        '\'s morgens|\'s ochtends|tussen de middag|\'s middags|\'s avonds|'+
        '(?:deze|van)\\s*nacht|' +
        'vandaag|' +
        '(?:over)?morgen(?:\\s*(ochtend|middag|avond|nacht))?|' +
        '(?:eer)?gister(?:\\s*(ochtend|middag|avond|nacht))?|' +
        'afgelopen\\s*nacht' +
    ')(?=\\W|$)', 'i');

exports.Parser = function DECasualDateParser() {

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt) {
        text = match[0].substr(match[1].length);

        const index = match.index + match[1].length;
        const result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        const refMoment = dayjs(ref);
        const lowerText = text.toLowerCase();

        var startMoment = refMoment;

        if (/(?:van|deze)\s*nacht/.test(lowerText)) {
            // Normally means this coming midnight
            result.start.imply('hour', 22);
            result.start.imply('meridiem', 1);
        } else if (/^overmorgen/.test(lowerText)) {
            startMoment = startMoment.add(refMoment.hour() > 1 ? 2 : 1, 'day');
        } else if (/^morgen/.test(lowerText)) {
            // Check not "Tomorrow" on late night
            if (refMoment.hour() > 1) {
                startMoment = startMoment.add(1, 'day');
            }
        } else if (/^gisteren/.test(lowerText)) {
            startMoment = startMoment.add(-1, 'day');
        } else if (/^eergisteren/.test(lowerText)) {
            startMoment = startMoment.add(-2, 'day');
        } else if (/afgelopen\s*nacht/.test(lowerText)) {
            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment = startMoment.add(-1, 'day');
            }
        } else if (lowerText === 'nu') {
            result.start.imply('hour', refMoment.hour());
            result.start.imply('minute', refMoment.minute());
            result.start.imply('second', refMoment.second());
            result.start.imply('millisecond', refMoment.millisecond());
        }

        var secondMatch = match[3] || match[4] || match[5];
        if (secondMatch) {
            switch (secondMatch.toLowerCase()) {
                case 'vroeg in de ochtend':
                    result.start.imply('hour', 6);
                    break;
                case 'ochtend':
                case 'morgen':
                case '\'s ochtends':
                case '\'s morgends':
                    result.start.imply('hour', 9);
                    break;
                case 'tussen de middag':
                    result.start.imply('hour', 12);
                    break;
                case 'middag':
                case 'in de middag':
                case '\'s middags':
                    result.start.imply('hour', 15);
                    result.start.imply('meridiem', 1);
                    break;
                case 'avond':
                case "'s avonds":
                    result.start.imply('hour', 18);
                    result.start.imply('meridiem', 1);
                    break;
                case 'nacht':
                case "'s nachts":
                    result.start.imply('hour', 0);
                    break;
            }
        }

        result.start.assign('day', startMoment.date());
        result.start.assign('month', startMoment.month() + 1);
        result.start.assign('year', startMoment.year());
        result.tags['NLCasualDateParser'] = true;
        return result;
    }
}
