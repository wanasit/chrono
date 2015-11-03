/*
    Date format with slash "/" (also "-" and ".") between numbers 
    - Tuesday 11/3/2015
    - 11/3/2015
    - 11/3
*/
var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = new RegExp('(\\W|^)' + 
    '((?:sun|mon|tues?|wed(?:nes)?|thu(?:rs?)?|fri|sat(?:ur)?)(?:day)?)?' +
    '\\s*\\,?\\s*' + 
    '([0-9]{1,2})[\\/\\.\\-]([0-9]{1,2})' + 
    '(' + 
        '[\\/\\.\\-]' + 
        '([0-9]{4}|[0-9]{2}))?' + 
    '(\\W|$)', 'i');

var DAYS_OFFSET = { 'sunday': 0, 'sun': 0, 'monday': 1, 'mon': 1,'tuesday': 2, 'wednesday': 3, 'wed': 3,
    'thursday': 4, 'thur': 4,'friday': 5, 'fri': 5,'saturday': 6, 'sat': 6,}
  
exports.Parser = function ENSlashDateFormatParser(argument) {
    Parser.apply(this, arguments);

    this.pattern = function () { return PATTERN; };
    this.extract = function(text, ref, match, opt){
        
        if(match[1] == '/' || match[7] == '/') {
            // Long skip, if there is some overlapping like:
            // XX[/YY/ZZ]
            // [XX/YY/]ZZ
            match.index += match[0].length
            return;
        }

        var index = match.index + match[1].length;
        var text = match[0].substr(match[1].length, match[0].length - match[7].length);
        var result = new ParsedResult({
            text: text,
            index: index,
            ref: ref,
        });
            
        if(text.match(/^\d.\d$/)) return;

        
        // MM/dd -> OK
        // MM.dd -> NG
        if(!match[6] && match[0].indexOf('/') < 0) return;

        var date = null;
        var year = match[6] || moment(ref).year() + '';
        var month = match[3];
        var day   = match[4];
        
        month = parseInt(month);
        day  = parseInt(day);
        year = parseInt(year);

        if(month < 1 || month > 12) {
            if(month > 12) {
                // dd/mm/yyyy date format if day looks like a month, and month
                // looks like a day.
                if (day >= 1 && day <= 12 && month >= 13 && month <= 31) {
                    // unambiguous
                    var tday = month;
                    month = day;
                    day = tday;
                }
                else {
                    // both month and day are <= 12
                    return null;
                }
            }
        }
        if(day < 1 || day > 31) return null;

        if(year < 100){
            if(year > 50){
                year = year + 2500 - 543; //BE
            }else{
                year = year + 2000; //AD
            }
        }
        
        text = month+'/'+day+'/'+year;
        date = moment(text,'M/D/YYYY');
        if(!date || date.date() != day || date.month() != (month-1)) {
            return null;
        }
        

        result.start.assign('day', date.date());
        result.start.assign('month', date.month() + 1);
        result.start.assign('year', date.year());

        //Day of week
        if(match[2]) {
            result.start.assign('weekday', DAYS_OFFSET[match[2].toLowerCase()]);
        }

        result.tags['ENSlashDateFormatParser'] = true;
        return result;
    };
};
