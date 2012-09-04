/*
  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  var PATTERN = /(วัน)?(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|ศุกร์|เสาร์)(หน้า|นี้|ที่แล้ว|.|$)/i;
  var DAYS_OFFSET = { 'อาทิตย์': 0, 'จันทร์': 1,'อังคาร': 2,'พุธ': 3,'พฤหัสบดี': 4,'ศุกร์': 5,'เสาร์': 6,}
  
  
  /**
   * THDayOfWeekParser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function THDayOfWeekParser(text, ref, opt){
    
    opt = opt || {};
    ref = ref || new Date();
    
    //Inherit Thai-Laguange support from THGeneralDateParser
    var parser = chrono.parsers.THGeneralDateParser(text, ref, opt);
    
    parser.pattern = function() { return PATTERN; }
    
    parser.extract = function(text,index){ 
      
      var results = this.results();
      var lastResult = results[results.length -1];
      if( lastResult ){
        //Duplicate...
        if( index < lastResult.index + lastResult.text.length )
          return null;
      }
      
      var matchedTokens = text.substr(index).match(PATTERN);
  		if(matchedTokens == null) return;
  		
  		var text = matchedTokens[0];
  		var dayOfWeek = matchedTokens[2];
  		dayOfWeek = dayOfWeek.toLowerCase();
  		
  		var offset = DAYS_OFFSET[dayOfWeek];
  		if(offset === undefined) return null;
  		
  		var date = moment(ref).clone();
      var suffix = matchedTokens[3];
      
      if(suffix == 'นี้'){
				
				date.day(offset);
			}
			else if(suffix == 'หน้า'){
				
				date.day(offset + 7)
			
			}else if(suffix == 'ที่แล้ว'){

  				date.day(offset - 7)
  		}else{
				
				date.day(offset);
				text = matchedTokens[0].substr(0, matchedTokens[0].length - matchedTokens[3].length);
			}

      return new chrono.ParseResult({
        referenceDate:ref,
        text:text,
        index:index,
        start:{
          day:date.date(),
          month:date.month(),
          year:date.year()
        }
      })
    };
    
  	return parser;
  }
  
  chrono.parsers.THDayOfWeekParser = THDayOfWeekParser;
})();

