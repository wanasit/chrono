/*
  ISO 8601
  http://www.w3.org/TR/NOTE-datetime
  // YYYY-MM-DD
  // YYYY-MM-DDThh:mmTZD
  // YYYY-MM-DDThh:mm:ssTZD
  // YYYY-MM-DDThh:mm:ss.sTZD 
  // TZD = (Z or +hh:mm or -hh:mm)
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /([0-9]{4})\-([0-9]{1,2})\-([0-9]{1,2})(T([0-9]{1,2}):([0-9]{1,2})(?::([0-9]{1,2})(?:\.\d+)?)?(Z|([+-]\d+):(\d+)))?(?=\W|$)/i
    
  //  (?:
  //    ([0-9]{1,2})(\.\d+)
  //  )?
  //  (Z|( (+|-)(\d+):(\d+) ))
  //;

  function InternationalStandardParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}
      
  		var text = matchedTokens[0];
      if (matchedTokens[4]) 
  		  text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[4].length);
  		
  		//Impossible Date or Invalid Date
  		var date = moment(text, 'YYYY-MM-DD');
  		if(date.format('YYYY-M-D') != text && date.format('YYYY-MM-DD') != text){
  		  return null;
  		} 


      var result = new chrono.ParseResult({
        referenceDate:ref,
        text:matchedTokens[0],
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year(),
          dayOfWeek:date.day()
        }
      })

      if (matchedTokens[5]) {
        result.start.assign('hour',   parseInt(matchedTokens[5]))
        result.start.assign('minute', parseInt(matchedTokens[6]))

        
        if (matchedTokens[8].toLowerCase() == 'z') {
          result.start.assign('timezoneOffset', 0)
        } else {

          var hourOffset   = parseInt(matchedTokens[9].toLowerCase())
          var minuteOffset = parseInt(matchedTokens[10].toLowerCase())

          var timezoneOffset = -hourOffset*60;
          if (timezoneOffset < 0) timezoneOffset -= minuteOffset
          else timezoneOffset += minuteOffset

          result.start.assign('timezoneOffset', timezoneOffset)
        }

      }

      if (matchedTokens[7]) {
        result.start.assign('second', parseInt(matchedTokens[7]))
      }


      return result;
    };
    
  	return parser;
  }
  
  chrono.parsers.InternationalStandardParser = InternationalStandardParser;
})();

