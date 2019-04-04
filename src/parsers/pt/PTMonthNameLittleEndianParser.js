/*


*/

var moment = require('moment');

var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var util  = require('../../utils/PT');

var DAYS_OFFSET = util.WEEKDAY_OFFSET;

var PATTERN = new RegExp('(\\W|^)' +
        '(?:(domingo|segunda|segunda-feira|terça|terça-feira|quarta|quarta-feira|quinta|quinta-feira|sexta|sexta-feira|sábado|sabado|dom|seg|ter|qua|qui|sex|sab)\\s*,?\\s*)?' +
        '([0-9]{1,2})(?:º|ª|°)?' +
        '(?:\\s*(?:desde|de|\\-|\\–|ao?|\\s)\\s*([0-9]{1,2})(?:º|ª|°)?)?\\s*(?:de)?\\s*' +
        '(Jan(?:eiro|\\.)?|Fev(?:ereiro|\\.)?|Mar(?:ço|\\.)?|Abr(?:il|\\.)?|Mai(?:o|\\.)?|Jun(?:ho|\\.)?|Jul(?:ho|\\.)?|Ago(?:sto|\\.)?|Set(?:embro|\\.)?|Out(?:ubro|\\.)?|Nov(?:embro|\\.)?|Dez(?:embro|\\.)?)' +
        '(?:\\s*(?:de?)?(\\s*[0-9]{1,4}(?![^\\s]\\d))(\\s*[ad]\\.?\\s*c\\.?|a\\.?\\s*d\\.?)?)?' +
        '(?=\\W|$)', 'i'
    );

var WEEKDAY_GROUP = 2;
var DATE_GROUP = 3;
var DATE_TO_GROUP = 4;
var MONTH_NAME_GROUP = 5;
var YEAR_GROUP = 6;
var YEAR_BE_GROUP = 7;

exports.Parser = function PTMonthNameLittleEndianParser(){
    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = match[DATE_GROUP];
        day = parseInt(day);

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                if (/a\.?\s*c\.?/i.test(match[YEAR_BE_GROUP])) {
                    // antes de Cristo
                    year = -year;
                }
            } else if (year < 100){

                year = year + 2000;
            }
        }

        if(year){
            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {

            //Find the most appropriated year
            var refMoment = moment(ref);
            refMoment.month(month - 1);
            refMoment.date(day);
            refMoment.year(moment(ref).year());

            var nextYear = refMoment.clone().add(1, 'y');
            var lastYear = refMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(refMoment.diff(moment(ref))) ){
                refMoment = lastYear;
            }

            result.start.assign('day', day);
            result.start.assign('month', month);
            result.start.imply('year', refMoment.year());
        }

        // Weekday component
        if (match[WEEKDAY_GROUP]) {
            var weekday = match[WEEKDAY_GROUP];
            weekday = util.WEEKDAY_OFFSET[weekday.toLowerCase()]
            result.start.assign('weekday', weekday);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[DATE_TO_GROUP]) {
            result.end = result.start.clone();
            result.end.assign('day', parseInt(match[DATE_TO_GROUP]));
        }

        result.tags['PTMonthNameLittleEndianParser'] = true;
        return result;
    };
}
