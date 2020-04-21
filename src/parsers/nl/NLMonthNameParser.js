/*

    The parser for parsing month name and year.

    EX.
        - januari
        - januari 2012
        - januari, 2012
*/
var parser = require('../parser');
var ParsedResult = require('../../result').ParsedResult;
var util  = require('../../utils/NL');

var PATTERN = new RegExp('(^|\\D\\s+|[^\\w\\s])' +
    '('+ util.MONTH_PATTERN +')' +
    '\\s*' +
    '(?:' +
    '[,-]?\\s*([0-9]{4})(\\s*BE|n\.Chr\.|v\.Chr\.)?' +
    ')?' +
    '(?=[^\\s\\w]|\\s+[^0-9]|\\s+$|$)', 'i');

var MONTH_NAME_GROUP = 2;
var YEAR_GROUP = 3;
var YEAR_BE_GROUP = 4;

exports.Parser = function ENMonthNameParser(){
    parser.Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){
        const result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[1].length),
            index: match.index + match[1].length,
            ref: ref,
        });

        const day = 1;
        const monthName = match[MONTH_NAME_GROUP];
        const month = util.MONTH_OFFSET[monthName.toLowerCase()];

        var year = null;
        if (match[YEAR_GROUP]) {
            year = match[YEAR_GROUP];
            year = parseInt(year);

            if(match[YEAR_BE_GROUP]){
                if (match[YEAR_BE_GROUP].match(/BE/)) {
                    // Buddhist Era
                    year = year - 543;
                } else if (match[YEAR_BE_GROUP].match(/v\.Chr\./)) {
                    // Before Christ
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
            year = parser.findYearClosestToRef(ref, day, month)
            result.start.imply('day', day);
            result.start.assign('month', month);
            result.start.imply('year', year);
        }

        if (result.text.match(/^\w{3}$/)) {
            return false;
        }

        result.tags['NLMonthNameParser'] = true;
        return result;
    }
}
