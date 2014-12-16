/*
    
    The parser for parsing US's date format that begin with month's name.
    
    EX. 
        - January 13
        - January 13, 2012
        - January 13 - 15, 2012
        - Tuesday, January 13, 2012
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'tue':2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4, 'thu': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
    
var regFullPattern  = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?(,)?(\s*[0-9]{4})(\s*BE)?(\W|$)/i;
var regShortPattern = /(\W|^)((Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s*,?\s*)?(Jan|January|Feb|February|Mar|March|Apr|April|May|Jun|June|Jul|July|Aug|August|Sep|September|Oct|October|Nov|November|Dec|December)\s*(([0-9]{1,2})(st|nd|rd|th)?\s*(to|\-)\s*)?([0-9]{1,2})(st|nd|rd|th)?([^0-9]|$)/i;


exports.Parser = function ENMonthNameMiddleEndianParser(){
    Parser.call(this);


    this.pattern = function() { return regShortPattern; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var result = new ParsedResult();
        var impliedComponents = [];
        var date = null;
        
        var originalText = '';
        var index = match.index;
        text = text.substr(index);
        
        var match = text.match(regFullPattern);
        if(match && text.indexOf(match[0]) == 0){
            
            var text = match[0];
            text = text.substring(match[1].length, match[0].length - match[14].length);
            index = index + match[1].length;
            originalText = text;
            
            text = text.replace(match[2], '');
            text = text.replace(match[4], match[4]+' ');
            if(match[5]) text = text.replace(match[5],'');
            if(match[10]) text = text.replace(match[10],'');
            if(match[11]) text = text.replace(',',' ');
            if(match[13]){
                var years = match[12];
                years = ' ' + (parseInt(years) - 543);
                text = text.replace(match[13], '');
                text = text.replace(match[12], years);
            }
            
            text = text.replace(match[9],parseInt(match[9])+'');
            date  = moment(text,'MMMM DD YYYY');
            if(!date) return null;

            result.start.assign('day', date.date());
            result.start.assign('month', date.month() + 1);
            result.start.assign('year', date.year());

        } else {
            
            match = text.match(regShortPattern);
            if(!match) return null;
            
            //Short Pattern (without years)
            var text = match[0];
            text = text.substring(match[1].length, match[0].length - match[11].length);
            index = index + match[1].length;
            originalText = text;

            text = text.replace(match[2], '');
            text = text.replace(match[4], match[4]+' ');
            if(match[4]) text = text.replace(match[5],'');
            
            date = moment(text,'MMMM DD');
            if(!date) return null;
            
            //Find the most appropriated year
            impliedComponents.push('year')
            date.year(moment(ref).year());
            var nextYear = date.clone().add(1, 'year');
            var lastYear = date.clone().add(-1, 'year');
            if( Math.abs(nextYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){  
                date = nextYear;
            }
            else if( Math.abs(lastYear.diff(moment(ref))) < Math.abs(date.diff(moment(ref))) ){ 
                date = lastYear;
            }

            result.start.assign('day', date.date());
            result.start.assign('month', date.month() + 1);
            result.start.imply('year', date.year());
        }
        
        //Day of week
        if(match[3]) {
            result.start.assign('weekday', DAYS_OFFSET[match[3].toLowerCase()]);
        }

        if (match[5]) {
            var endDay = parseInt(match[9]);
            var startDay = parseInt(match[6]);

            result.end = result.start.clone();
            result.start.assign('day', startDay);
            result.end.assign('day', endDay);
            

            var endDate = date.clone();
            
            date.date(startDay);
            endDate.date(endDay);
        }

        result.index = index;
        result.text = originalText;
        result.ref = ref;

        result.tags['ENMonthNameMiddleEndianParser'] = true;
        return result;
    }

    
}

