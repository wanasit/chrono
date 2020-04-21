exports.WEEKDAY_OFFSET = {
    'zondag': 0,
    'zo': 0,
    'zo.': 0,
    'maandag': 1,
    'ma': 1,
    'ma.': 1,
    'dinsdag': 2,
    'di':2,
    'di.':2,
    'woensdag': 3,
    'wo': 3,
    'wo.': 3,
    'donderdag': 4,
    'do': 4,
    'do.': 4,
    'vrijdag': 5,
    'vr': 5,
    'vr.': 5,
    'zaterdag': 6,
    'za': 6,
    'za.': 6
};

exports.WEEKDAY_PATTERN = '(?:'
    + Object.keys(exports.WEEKDAY_OFFSET).join('|').replace(/\./g, '\\.')
    + ')';

exports.MONTH_OFFSET = {
    'januari': 1,
    'jan': 1,
    'jan.': 1,
    'februari': 2,
    'feb': 2,
    'feb.': 2,
    'maart': 3,
    'mrt': 3,
    'mrt.': 3,
    'april': 4,
    'apr': 4,
    'apr.': 4,
    'mei': 5,
    'juni': 6,
    'jun': 6,
    'jun.': 6,
    'juli': 7,
    'jul': 7,
    'jul.': 7,
    'augustus': 8,
    'aug': 8,
    'aug.': 8,
    'september': 9,
    'sep': 9,
    'sep.': 9,
    'sept': 9,
    'sept.': 9,
    'oktober': 10,
    'okt': 10,
    'okt.': 10,
    'november': 11,
    'nov': 11,
    'nov.': 11,
    'december': 12,
    'dec': 12,
    'dec.': 12
};

exports.MONTH_PATTERN = '(?:'
    + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.')
    + ')';

exports.INTEGER_WORDS = {
    'een' : 1,
    'één' : 1,
    'twee' : 2,
    'drie' : 3,
    'vier' : 4,
    'vijf' : 5,
    'zes' : 6,
    'zeven' : 7,
    'acht' : 8,
    'negen' : 9,
    'tien' : 10,
    'elf' : 11,
    'twaalf' : 12
};
exports.INTEGER_WORDS_PATTERN = '(?:'
    + Object.keys(exports.INTEGER_WORDS).join('|')
    +')';

exports.ORDINAL_WORDS = {
    'eerste' : 1,
    'tweede': 2,
    'derde': 3,
    'vierde': 4,
    'vijfde': 5,
    'zesde': 6,
    'zevende': 7,
    'achste': 8,
    'negende': 9,
    'tiende': 10,
    'elfde': 11,
    'twaalfde': 12,
    'dertiende': 13,
    'veertiende': 14,
    'vijftiende': 15,
    'zestiende': 16,
    'zeventiende': 17,
    'achttiende': 18,
    'negentiende': 19,
    'twintigste': 20,
    'eenentwintigste': 21,
    'tweeëntwintigste': 22,
    'drieëntwintigste': 23,
    'vierentwintigste': 24,
    'vijfentwintigste': 25,
    'zesentwintigste': 26,
    'zevenentwintigste': 27,
    'achtentwintigste': 28,
    'negenentwintigste': 29,
    'dertigste': 30,
    'eenendertigste': 31
};
exports.ORDINAL_WORDS_PATTERN = '(?:'
    + Object.keys(exports.ORDINAL_WORDS).join('|').replace(/ /g, '[ -]')
    + ')';

var TIME_UNIT =
    '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|en(?:\\s*few)?|half)\\s*' +
    '(sec(?:onde?)?|min(?:uten)?s?|(?:uur|uren)?|weken?|dagen?|maanden?|jaren?)\\s*';

var TIME_UNIT_STRICT =
    '(?:[0-9]+?)\\s*' +
    '(?:seconden?|(?:minuut|minuten)|(?:uur|uren)|(?:dag|dagen))\\s*';

var PATTERN_TIME_UNIT = new RegExp(TIME_UNIT, 'i');

exports.TIME_UNIT_PATTERN = '(?:' + TIME_UNIT + ')+';
exports.TIME_UNIT_STRICT_PATTERN = '(?:' + TIME_UNIT_STRICT + ')+';

exports.extractDateTimeUnitFragments = function (timeunitText) {
    var fragments = {};
    var remainingText = timeunitText;
    var match = PATTERN_TIME_UNIT.exec(remainingText);
    while (match) {
        collectDateTimeFragment(match, fragments);
        remainingText = remainingText.substring(match[0].length);
        match = PATTERN_TIME_UNIT.exec(remainingText);
    }
    return fragments;
};

function collectDateTimeFragment(match, fragments) {
    var num = match[1].toLowerCase() ;
    if (exports.INTEGER_WORDS[num] !== undefined) {
        num = exports.INTEGER_WORDS[num];
    } else if (num.match(/half/)) {
        num = 0.5;
    } else {
        num = parseFloat(num);
    }

    if (match[2].match(/^(?:uur|uren)/i)) {
        fragments['hour'] = num;
    } else if (match[2].match(/min/i)) {
        fragments['minute'] = num;
    } else if (match[2].match(/sec/i)) {
        fragments['second'] = num;
    } else if (match[2].match(/week/i)) {
        fragments['week'] = num;
    } else if (match[2].match(/dag/i)) {
        fragments['d'] = num;
    } else if (match[2].match(/maand/i)) {
        fragments['month'] = num;
    } else if (match[2].match(/jaar/i)) {
        fragments['year'] = num;
    }

    return fragments;
}
