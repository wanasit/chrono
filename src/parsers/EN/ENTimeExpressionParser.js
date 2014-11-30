/*


*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;


var FIRST_REG_PATTERN = new RegExp("(^|\\s|T)(at|from)?\\s*(\\d{1,2}|noon|midnight)((\\.|\\:|\\：)(\\d{2})((\\.|\\:|\\：)(\\d{2}))?)?(?!%)(\\s*(AM|PM|A\\.M\\.|P\\.M\\.))?(?=\\W|$)", 'i');
var SECOND_REG_PATTERN = new RegExp("^\\s*(\\-|\\~|\\〜|to|\\?)\\s*(\\d{1,2})((\\.|\\:|\\：)(\\d{2})((\\.|\\:|\\：)(\\d{2}))?)?(?!%)(\\s*(AM|PM|A\\.M\\.|P\\.M\\.))?(?=\\W|$)", 'i');
    
exports.Parser = function ENTimeExpressionParser(){
    Parser.call(this);

    this.pattern = function() { return FIRST_REG_PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        // This pattern can be overlaped Ex. [12] AM, 1[2] AM
        if (match.index > 0 && text[match.index-1].match(/\w/)) return null;

        var refMoment = moment(ref);
        if (match[2] == null && match[11] == null && match[6] == null)
            return null;
        
        var result = new ParsedResult();
        result.tags['ENTimeExpressionParser'] = true;

        result.start.imply('day', refMoment.date());
        result.start.imply('month', refMoment.month()+1);
        result.start.imply('year', refMoment.year());
        
        var hour = 0;
        var minute = 0;
        var second = 0;
        var meridiem = -1;
        
        // ----- Hours
        if (match[3].toLowerCase() == "noon"){
            meridiem = 1; 
            hour = 12;
        } else if (match[3].toLowerCase() == "midnight") {
            meridiem = 0; 
            hour = 0;
        } else {
            hour = parseInt(match[3]);
        }
        
        // ----- Minutes
        if(match[6] != null){ 
            minute = parseInt(match[6]);
            if(minute >= 60) return null;
            
        } else if(hour > 100) { 
            minute = hour%100;
            hour   = hour/100;
        }
        
        // ----- Second
        if(match[9] != null){ 
            second = parseInt(match[9]);
            if(second >= 60) return null;
        }
        
        // ----- AM & PM  
        if(match[11] != null) {
            if(hour > 12) return null;
            if(match[11].replace(".", "").toLowerCase() == "am"){
                meridiem = 0; 
                if(hour == 12) hour = 0;
            }
            
            if(match[11].replace(".", "").toLowerCase() == "pm"){
                meridiem = 1; 
                if(hour != 12) hour += 12;
            }
        }
        
        if (hour > 24) return null;
        if (hour >= 12) meridiem = 1;
        
        result.index = match.index + match[1].length;
        result.text  = match[0].substring(match[1].length);
        
        result.start.assign('hour', hour);
        result.start.assign('minute', minute);
        result.start.assign('second', second);
            
        if (meridiem >= 0) 
            result.start.assign('meridiem', meridiem);
        
        match = SECOND_REG_PATTERN.exec(text.substring(result.index + result.text.length));
        if (!match) {
            return result;
        }
        
        meridiem = -1;
        minute = 0;
        second = 0;
        hour = parseInt(match[2]);
        
        // ----- Minute
        if (match[5]!= null) {
            
            minute = parseInt(match[5]);
            if(minute >= 60) return result;
            
        } else if (hour > 100) {

            minute = hour%100;
            hour   = hour/100;
        }
        
        // ----- Second
        if (match[8] != null) { 
            second = parseInt(match[8]);
            if(second >= 60) return result;
        }
        
        // ----- AM & PM 
        if (match[10] != null){
             
            if (hour > 12) return result;
            if (match[10].toLowerCase() == "am") {
                if(hour == 12) {
                    hour = 0;
                    if(result.end == null){
                        result.end = new ParsedComponent(result.start);
                    }
                    result.end.assign('day', result.end.get('day') + 1);
                }
            }
            
            if (match[10].toLowerCase() == "pm") {
                if (hour != 12) hour += 12;
            }
            
            if (!result.start.isCertain('meridiem')) {
                if(match[10].toLowerCase() == "am"){
                    
                    result.start.imply('meridiem', 0);
                    
                    if (result.start.get('hour') == 12) 
                        result.start.assign('hour', 0);
                }
                if(match[10].toLowerCase() == "pm"){
                    result.start.imply('meridiem', 1);
                    
                    if (result.start.get('hour') != 12) 
                        result.start.assign('hour', result.start.get('hour') + 12); 
                }
            }
        }
        
        if(hour >= 12) meridiem = 1;
        
        result.text = result.text + match[0];
        
        if(result.end == null){
            result.end = result.start.clone();
        }
        
        result.end.assign('hour', hour);
        result.end.assign('minute', minute);
        result.end.assign('second', second);
        
        if (meridiem >= 0) 
            result.end.assign('meridiem', meridiem);
        
        return result;
    }
}

