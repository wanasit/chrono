/*
    
    
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((\,|\(|\（)\s*)?((this|last|next)\s*)?(Sunday|Sun|Monday|Mon|Tuesday|Tues|Tue|Wednesday|Wed|Thursday|Thurs|Thur|Friday|Fri|Saturday|Sat)(\s*(\,|\)|\）))?(\W|$)/i;
var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
    
exports.Parser = function ENWeekdayParser() {
    Parser.call(this);

    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[9].length - match[1].length);
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var dayOfWeek = match[6].toLowerCase();
        var offset = DAYS_OFFSET[dayOfWeek];
        if(offset === undefined) return null;
        
        var startMoment = moment(ref);
        var prefix = match[5];
        if (prefix) {
            prefix = prefix.toLowerCase();
            
            if(prefix == 'last')
                startMoment.day(offset - 7)
            else if(prefix == 'next')
                startMoment.day(offset + 7)
            else if(prefix== 'this')
                startMoment.day(offset);
        }
        else{
            var refOffset = startMoment.day();

            if (Math.abs(offset - 7 - refOffset) < Math.abs(offset - refOffset)) {
                startMoment.day(offset - 7);
            } else if (Math.abs(offset + 7 - refOffset) < Math.abs(offset - refOffset)) {
                startMoment.day(offset + 7);
            } else {
                startMoment.day(offset);
            }
        }

        result.start.assign('weekday', offset);
        result.start.imply('day', startMoment.date())
        result.start.imply('month', startMoment.month() + 1)
        result.start.imply('year', startMoment.year())
        return result;
    }
}

