const dayjs = require('dayjs');
const parser = require('../parser');
const ParsedResult = require('../../result').ParsedResult;

const util  = require('../../utils/JP'); 

const PATTERN = /(?:(同|今|本|((昭和|平成|令和)?([0-9０-９]{1,4}|元)))年\s*)?([0-9０-９]{1,2})月\s*([0-9０-９]{1,2})日/i;
const SPECIAL_YEAR_GROUP  = 1;
const TYPICAL_YEAR_GROUP  = 2;
const ERA_GROUP         = 3;
const YEAR_NUMBER_GROUP = 4;
const MONTH_GROUP       = 5;
const DAY_GROUP         = 6;

exports.Parser = function JPStandardParser(){
    parser.Parser.apply(this, arguments);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        var result = new ParsedResult({
            text: match[0],
            index: match.index,
            ref: ref,
        });
        
        var month = match[MONTH_GROUP];
        month = util.toHankaku(month);
        month = parseInt(month);

        var day = match[DAY_GROUP];
        day = util.toHankaku(day);
        day = parseInt(day);

        result.start.assign('day', day);
        result.start.assign('month', month);
            
        if (match[TYPICAL_YEAR_GROUP]) {

            var year = match[YEAR_NUMBER_GROUP];
            if (year == '元') {
                year = 1;
            } else {
                year = util.toHankaku(year);
                year = parseInt(year);
            }

            if (match[ERA_GROUP] == '令和') {
                year += 2018;
            } else if (match[ERA_GROUP] == '平成') {
                year += 1988;
            } else if (match[ERA_GROUP] == '昭和') {
                year += 1925;
            }

            result.start.assign('year', year);

        } else if (match[SPECIAL_YEAR_GROUP] && match[SPECIAL_YEAR_GROUP].match('同|今|本')) {
            const moment = dayjs(ref)
            result.start.assign('year', moment.year());
        } else {
            const year = parser.findYearClosestToRef(ref, day, month);
            result.start.imply('year', year);
        }
        
        result.tags['JPStandardParser'] = true;
        return result;
    };

}

