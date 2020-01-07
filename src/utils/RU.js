exports.WEEKDAY_OFFSET = { 
    'воскресенье': 0, 
    'вс': 0, 
    'понедельник': 1, 
    'пн': 1,
    'вторник': 2, 
    'вт':2, 
    'среда': 3, 
    'ср': 3, 
    'четверг': 4, 
    'чт': 4, 
    'пятница': 5, 
    'пт': 5,
    'суббота': 6, 
    'сб': 6
};
    
exports.MONTH_OFFSET = { 
    'января': 1,
    'янв': 1,
    'янв.': 1,
    'февраля': 2,
    'фев': 2,
    'фев.': 2,
    'марта': 3,
    'мар': 3,
    'мар.': 3,
    'апреля': 4,
    'апр': 4,
    'апр.': 4,
    'мая': 5,
    'июня': 6,
    'июн': 6,
    'июн.': 6,
    'июля': 7,
    'июл': 7,
    'июл.': 7,
    'августа': 8,
    'авг': 8,
    'авг.': 8,
    'сентября': 9,
    'сен': 9,
    'сен.': 9,
    'октября': 10,
    'окт': 10,
    'окт.': 10,
    'ноября': 11,
    'ноя': 11,
    'ноя.': 11,
    'декября': 12,
    'дек': 12,
    'дек.': 12
};

exports.INTEGER_WORDS_PATTERN = '(?:один|два|три|четыре|пять|шесть|семь|восемь|девять|десять|одиннадцать|двенадцать)';
exports.INTEGER_WORDS = {
    'один' : 1,
    'два' : 2,
    'три' : 3,
    'четыре' : 4,
    'пять' : 5,
    'шесть' : 6,
    'семь' : 7,
    'восемь' : 8,
    'девять' : 9,
    'десять' : 10,
    'одиннадцать' : 11,
    'двенадцать' : 12,
};

exports.MONTH_PATTERN = '(?:'
    + Object.keys(exports.MONTH_OFFSET).join('|').replace(/\./g, '\\.')
    + ')';

exports.INTEGER_WORDS = {
    'один' : 1,
    'два' : 2,
    'три' : 3,
    'четыре' : 4,
    'пять' : 5,
    'шесть' : 6,
    'семь' : 7,
    'восемь' : 8,
    'девять' : 9,
    'десять' : 10,
    'одиннадцать' : 11,
    'двенадцать' : 12
};
exports.INTEGER_WORDS_PATTERN = '(?:'
    + Object.keys(exports.INTEGER_WORDS).join('|')
    +')';

var TIME_UNIT =
    '(' + exports.INTEGER_WORDS_PATTERN + '|[0-9]+|[0-9]+\.[0-9]+|an?(?:\\s*несколько)?|пол(?:\\s*an?)?)\\s*' +
    '(секунды?|минуты?|часа?|часов?|недель?|недели|дней?|дня?|месяцев?|месяца?|лет?|года?)\\s*';

var TIME_UNIT_STRICT =
    '(?:[0-9]+|an?)\\s*' +
    '(?:секунд?|минут?|часов?|дней?)\\s*';

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
