/*
    
    The parser for parsing month name and year.
    
    EX. 
        - Januar
        - Januar 2012
*/

const parser = require('../parser');
const ParsedResult = require('../../result').ParsedResult;
const util  = require('../../utils/DE');

const PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' +
    '(Jan\\.?|Januar|Feb\\.?|Februar|Mär\\.?|M(?:ä|ae)rz|Mrz\\.?|Apr\\.?|April|Mai\\.?|Jun\\.?|Juni|Jul\\.?|Juli|Aug\\.?|August|Sep\\.?|Sept\\.?|September|Okt\\.?|Oktober|Nov\\.?|November|Dez\\.?|Dezember)' + 
    '\\s*' +
    '(?:' +
        ',?\\s*(?:([0-9]{4})(\\s*[vn]\\.?\\s*C(?:hr)?\\.?)?|([0-9]{1,4})\\s*([vn]\\.?\\s*C(?:hr)?\\.?))' +
    ')?' +
    '(?=[^\\s\\w]|$)', 'i');

const MONTH_NAME_GROUP = 2;
const YEAR_GROUP = 3;
const YEAR_BE_GROUP = 4;
const YEAR_GROUP2 = 5;
const YEAR_BE_GROUP2 = 6;

exports.Parser = function ENMonthNameParser(){
    parser.Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){
        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        
        var month = match[MONTH_NAME_GROUP];
        month = util.MONTH_OFFSET[month.toLowerCase()];

        var day = 1;

        var year = null;
        if (match[YEAR_GROUP] || match[YEAR_GROUP2]) {
            year = match[YEAR_GROUP] || match[YEAR_GROUP2];
            year = parseInt(year);

            if (match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2]) {
                if (/v/i.test(match[YEAR_BE_GROUP] || match[YEAR_BE_GROUP2])) {
                    // v.Chr.
                    year = -year;
                }

            } else if (year < 100){ 

                year = year + 2000;
            }
        }

        if(year){
            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.assign('year', year);
        } else {
            
            year = parser.findYearClosestToRef(ref, day, month);
            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.imply('year', year);
        }

        if (this.isStrictMode() && result.text.match(/^\w+$/)) {
            return false;
        }

        result.tags['DEMonthNameParser'] = true;
        return result;
    }
}

