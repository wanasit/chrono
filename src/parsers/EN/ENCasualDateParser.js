/*
    
    
*/

var moment = require('moment');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

var PATTERN = /(today|tonight|tomorrow|tmr|yesterday|last\s*night|this\s*(morning|afternoon|evening))(?=\W|$)/i;
    
exports.Parser = exports.Parser = function (ENENCasualDateParser)(){
    
    Parser.call(this);
        
    this.pattern = function() { return PATTERN; }
    
    this.extract = function(text, ref, match, opt){ 
        
        var text = match[0].toLowerCase();
        var refMoment = moment(ref);
        var result = new chrono.ParseResult({
            text: text,
            index: match.index,
            start: {}
        });

        var date = null;
        var lowerText = text.toLowerCase();
        if(lowerText == 'today' || lowerText == 'tonight'){

            date = refMoment.clone();

        } else if(lowerText == 'tomorrow' || lowerText == 'tmr'){

            if(refMoment.hour() < 4) {
                date = refMoment.clone().hour(6);
            } else {
                date = refMoment.clone().add(1, 'day');
            }

        } else if(lowerText == 'yesterday') {

            date = refMoment.clone().add('d',-1);
        }
        else if(lowerText.match('last')) {

            date = refMoment.clone().add('d',-1);

        } else if (lowerText.match("this")) {

            var secondMatch = match[2].toLowerCase();
            if (secondMatch == "afternoon") {

                result.start.imply('hour', 15);

            } else if (secondMatch == "evening") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "morning") {

                result.start.imply('hour', 3);
                if (refMoment.hour() < 3) {
                    // When say "this morning" on before 3 AM
                    date = refMoment.clone().add(-1, 'day');
                }
            }
        }

        result.start.assign('day', date.date())
        result.start.assign('month', date.month())
        result.start.assign('year', date.year())
        return result;
    }
}

