/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(今日|昨日|明日|([1-9]+)\s*日前)(\W|$)/i;
  
  function JPGeneralDateParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    var parser = chrono.Parser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(full_text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var matchedTokens = full_text.substr(index).match(PATTERN);
  		if(matchedTokens == null){
  			finished = true;
  			return;
  		}

  		var text = matchedTokens[0].toLowerCase();
  		text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[3].length);

  		var date = null;
  		if(text == '今日')
  			date = moment(ref).clone();
  		else if(text == '明日')
  			date = moment(ref).clone().add('d',1);
  		else if(text == '昨日')
  			date = moment(ref).clone().add('d',-1);
  		else {
  		  var days_ago = matchedTokens[2];
  		  days_ago = parseInt(days_ago);
  		  date = moment(ref).clone().add('d',-days_ago);
  		}
  		  
      var result = new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year()
        }
      })
      
      var resultWithTime = parser.extractTime(full_text,result);
      result = resultWithTime || result;      
      return result;
    };
    
  	
		var baseExtractTime = parser.extractTime;
		parser.extractTime = function(text, result){
      
			//Western - Time
			var baseResult = baseExtractTime.call(this, text, result);
			if(baseResult) return baseResult;
			
      var SUFFIX_PATTERN = /\s*(午前|午後)?\s*([0-9]{1,2})時?(([0-9]{1,2})分)?/i;
      
      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);
      
      var matchedTokens = text.match(SUFFIX_PATTERN);
      if( !matchedTokens || text.indexOf(matchedTokens[0]) != 0) return null;
      
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      hour = parseInt(hour);
      
      if(matchedTokens[1]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[1] == "午後"){
         hour += 12;
        }
      }
      
      if(matchedTokens[4]){
        
        minute = matchedTokens[4];
        minute = parseInt(minute);
        if(minute >= 60) return null;
      }
      
      result.text = result.text + matchedTokens[0];
      
      if(result.start.hour == undefined){
        result.start.hour = hour;
        result.start.minute = minute;
        result.start.second = second;
      }
      
      if(result.end && result.end.hour == undefined){
        result.end.hour = hour;
        result.end.minute = minute;
        result.end.second = second;
      }
      
      return new chrono.ParseResult(result);
    }
		
		
		return parser;
  }
  
  chrono.parsers.JPGeneralDateParser = JPGeneralDateParser;
})();

