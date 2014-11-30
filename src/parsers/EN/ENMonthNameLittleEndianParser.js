/*
    
    
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tue':2, 'wednesday': 3, 'wed': 3,
        'thursday': 4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
    
var PATTERN  = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?([0-9]{1,2})(st|nd|rd|th)?(\s*(to|\-|\s)\s*([0-9]{1,2})(st|nd|rd|th)?)?\s*(?:of)?\s*(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)((\s*[0-9]{2,4})(\s*BE)?)?(\W|$)/i;

exports.Parser = function ENMonthNameLittleEndianParser(){
    Parser.call(this);
    
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var result = new ParsedResult({
            text: match[0].substr(match[1].length, match[0].length - match[14].length - match[1].length),
            index: match.index + match[1].length
        });

        var text = result.text;
        if(match[5]) text = text.replace(match[5],'');
        if(match[6]) text = text.replace(match[6],'');

        var year = null
        if(match[11]){
            year = match[12];
            year = parseInt(year);

            if(match[13]){ 
                //BC
                text = text.replace(match[13], '');
                year = year - 543;

            } else if (year < 100){ 

                year = year + 2000;
            }
        }



        if(year){
            var startMoment = moment(text,'DD MMMM YYYY');
            if(!startMoment) return null;
            
            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.assign('year', startMoment.year());
        } else {
            startMoment  = moment(text,'DD MMMM');
            if(!startMoment) return null;
            
            //Find the most appropriated year
            startMoment.year(moment(ref).year());
            var nextYear = startMoment.clone().add(1, 'y');
            var lastYear = startMoment.clone().add(-1, 'y');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){  
                startMoment = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(startMoment.diff(moment(ref))) ){ 
                startMoment = lastYear;
            }

            result.start.assign('day', startMoment.date());
            result.start.assign('month', startMoment.month() + 1);
            result.start.imply('year', startMoment.year());
        }
        
        // Weekday component
        if (match[3]) {
            result.start.assign('weekday', DAYS_OFFSET[match[3].toLowerCase()]);
        }

        // Text can be 'range' value. Such as '12 - 13 January 2012'
        if (match[8]) {
            result.end = result.start.clone();
            result.start.assign('day', parseInt(match[4]));
            result.end.assign('day', parseInt(match[8]));
        }

        result.tags['ENMonthNameLittleEndianParser'] = true;
        return result;
    };

}

