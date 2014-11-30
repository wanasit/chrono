/*
    
    
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(\W|^)((\,|\(|\（)\s*)?((this|last|next)\s*)?(Sunday|Sun|Monday|Mon|Tuesday|Tues|Tue|Wednesday|Wed|Thursday|Thurs|Thur|Friday|Fri|Saturday|Sat)(\s*(\,|\)|\）))?(\W|$)/i;
var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tues':2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thurs':4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
    
export.Parser = function ENDayOfWeekParser(){
        
    Parser.call(this);

        this.pattern = function() { return PATTERN; }
        
        this.extract = function(text, ref, match, opt){ 
            
            var results = this.results();
            var lastResult = results[results.length -1];
            if( lastResult ){
                //Duplicate...
                if( index < lastResult.index + lastResult.text.length )
                    return null;
            }
            
            var match = text.substr(index).match(PATTERN);
            if(match == null){
                finished = true;
                return;
            }
            var text = match[0];
            index = index + match[1].length;
            text = match[0].substr(match[1].length, match[0].length - match[9].length - match[1].length);
            
            var prefix = match[5];
            var dayOfWeek = match[6];
            
            dayOfWeek = dayOfWeek.toLowerCase();
            var offset = DAYS_OFFSET[dayOfWeek];
            
            if(offset === undefined) return null;
            
            var date = moment(ref).clone();
            
            if(prefix){
                
                prefix = prefix.toLowerCase();
                
                if(prefix == 'last')
                    date.day(offset - 7)
                else if(prefix == 'next')
                    date.day(offset + 7)
                else if(prefix== 'this')
                    date.day(offset);
            }
            else{
                var ref_offset = date.day();

                if(offset > ref_offset)
                    date.day(offset);
                else
                    date.day(offset+7);
            }
            
            return new chrono.ParseResult({
                referenceDate:ref,
                text:text,
                index:index,
                start:{
                    day:date.date(),
                    month:date.month(),
                    year:date.year(),
                    dayOfWeek: offset,
                    impliedComponents: ['day','month','year'],
                }
            })
        };
        
        return parser;
    }
    
    chrono.parsers.DayOfWeekParser = DayOfWeekParser;
})();

