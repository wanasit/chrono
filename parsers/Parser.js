/*
  Parser, is base object of every chrono parser. The parser must provides these following method  
    
    - (public) exec()         : Parse the text for one matching index. This method may return a pasring result, or NULL.
        
    - (public) execAll()      : Parse the whole text. (run exec() for all of remaining text) 
      
    - (public) results()      : Get array of parsing results
    
    - (public) finished()     : All of the text has benn parsed ?
    
    
    - (protected**) pattern()   : RegEx for matching the date pattern from the text. 
                              : The parser should OVERRIDE this method. 
    
    - (protected**) extract(text, index) : This method will be called after detected matched pattern 
                                          to create a parsing result from text at index. 
                                       : The parser should OVERRIDE this method.
    
    - (protected**) extractTime(text, result) : This method will be called for every result of extract() 
                                                that doesn't have time component. 
                                         : The parser may not need to override this method
    
    
    - (protected**) mergeOverlapResult(text, result1, result2) :
                                      Check whether two parsing result are overlapped each other as 'start-end' date.
                                      If they do, this function will merged them into one.
                                   : The parser may not need to override this method
                                    
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  /**
   * Parser - Create a parser object
   *
   * @param  { String }           text - Orginal text to be parsed
   * @param  { Date, Optional }   ref  - Referenced date
   * @param  { Object, Optional } opt  - Parsing option
   * @return { CNParser } 
   */
  function Parser(text, ref, opt){
    
    var searchingIndex = 0;
    var searchingText = text;
    var searchingFinished = false;
    var searchingResults = [];
    
    var parser = {};
    
    /**
     * Parser.pattern - Matching Pattern 
     *
     * @return { CNParser } 
     */
    parser.pattern = function() { return /./i; }
    
    /**
     * Parser.extract - Extract a parsing result from text at index
     *
     * @param  { String }    text - Orginal text to be parsed
     * @param  { Integer }   index  - Pattern matching index
     * @return { CNResult } 
     */
    parser.extract = function(text,index){ return null; };
    
    /**
     * Parser.results - Get results
     * @return { Array<CNParser> } 
     */
    parser.results = function(){ return searchingResults; }
    
    /**
     * Parser.finished - Check whether all of the text has been parsed 
     * @return { Bool } 
     */
    parser.finished = function(){ return searchingFinished; }
    
    
    /**
     * Parser.mergeOverlapResult
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result1
     * @param  { CNResult } result2
     * @return { CNResult } 
     */
    parser.mergeOverlapResult = function(text, result1, result2){
      
      if(result2.index < result1.index){
        var tmp = result1; result1 = result2; result2 = tmp;
      }
      
      var begin = result1.index + result1.text.length;
      var end   = result2.index; 
      if(end < begin &&  result1.index < result2.index && begin < result2.index + result2.text.length){
        var mergedIndex = result1.index;
        var mergedText = text.substring(result1.index, result2.index+result2.text.length);
        var impliedComponents1 = result1.start.impliedComponents || [];
        var impliedComponents2 = result2.start.impliedComponents || [];
        
        if(impliedComponents1.length < impliedComponents2.length){
          var tmp = result1; result1 = result2; result2 = tmp;
          impliedComponents1 = result1.start.impliedComponents || [];
          impliedComponents2 = result2.start.impliedComponents || [];
        }
        
        if(impliedComponents1.indexOf('day') < 0 || impliedComponents1.indexOf('month') < 0 || impliedComponents1.indexOf('year') < 0)
          return;
        
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :mergedIndex,
          start :result2.start,
          end   :result2.end,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      
      var textBetween = text.substring(begin,end);
      
      var OVERLAP_PATTERN = /^\s*(to|\-)\s*$/i;
      if(!textBetween.match(OVERLAP_PATTERN)) return null;
      var mergedText = result1.text + textBetween + result2.text;
      
      var components1 = new Object(result1.start);
      var components2 = new Object(result2.start);
      var impliedComponents1 = result1.start.impliedComponents || [];
      var impliedComponents2 = result2.start.impliedComponents || [];
      
      impliedComponents1.forEach(function(component) {
        if(!components2.impliedComponents || components2.impliedComponents.indexOf(component) < 0){
          components1[component] = components2[component]
          var index = components1.impliedComponents.indexOf(component);
          components1.impliedComponents.splice(index, 1);
        } 
      });

      impliedComponents2.forEach(function(component) {
        if(!components1.impliedComponents || components1.impliedComponents.indexOf(component) < 0){
          components2[component] = components1[component]
          var index = components2.impliedComponents.indexOf(component);
          components2.impliedComponents.splice(index, 1);
        }
      });
      
      
      if(moment(components2.date()).diff(moment(components1.date())) > 0){ 
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components1,
          end   :components2,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      else{

        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components2,
          end   :components1,
          text  :mergedText,
          referenceDate :result1.referenceDate,
        });
      }

    }
    
    /**
     * Parser.extractDate
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result
     * @return { CNResult } 
     */
    parser.extractTime = function(text, result){
      
      var SUFFIX_PATTERN = /\s*,?\s*(at|from)?\s*,?\s*([0-9]{1,4})((\.|\:|\：)([0-9]{1,2})((\.|\:|\：)([0-9]{1,2}))?)?(\s*(AM|PM))?/i;
      var TO_SUFFIX_PATTERN = /\s*(\-|\~|\〜|to|\W)?\s*([0-9]{1,4})((\.|\:|\：)([0-9]{1,2})((\.|\:|\：)([0-9]{1,2}))?)?(\s*(AM|PM))?/i;
      
      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);
      
      var matchedTokens = text.match(SUFFIX_PATTERN);
      if( !matchedTokens || text.indexOf(matchedTokens[0]) != 0) return null;
      
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      hour = parseInt(hour);
      
      if(matchedTokens[5]){
        
        minute = matchedTokens[5];
        minute = parseInt(minute);
        if(minute >= 60) return null;
        
      }else if(hour > 100){
        minute = hour%100;
        hour   = (hour - minute)/100;
      }
      
      if(matchedTokens[8]){
        
        second = matchedTokens[8];
        second = parseInt(second);
        if(second >= 60) return null;
      }
      
      if(matchedTokens[10]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[10].toLowerCase() == "am"){
          if(hour == 12) hour = 0;
        }
        if(matchedTokens[10].toLowerCase() == "pm"){
          if(hour != 12) hour += 12;
        }
        
        result.start.meridiem = matchedTokens[10].toLowerCase();
      }
      if(hour >= 12) result.start.meridiem = 'pm';
      
      result.text = result.text + matchedTokens[0];
      
      if(result.start.hour == undefined){
        result.start.hour = hour;
        result.start.minute = minute;
        result.start.second = second;
      }
      
      
      text = text.substr(matchedTokens[0].length);
      var matchedTokens = text.match(TO_SUFFIX_PATTERN)
      if( !matchedTokens || text.indexOf(matchedTokens[0]) != 0) {
        
        //Time in POINT format.
        // Return
        if(result.end && result.end.hour == undefined){
          result.end.hour = hour;
          result.end.minute = minute;
          result.end.second = second;
        }

        return new chrono.ParseResult(result);
      }
      //Time in RANGE format. 
      // Calculate the END point...
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      hour = parseInt(hour);
      
      if(matchedTokens[5]){
        
        minute = matchedTokens[5];
        minute = parseInt(minute);
        if(minute >= 60) return null;
        
      }else if(hour > 100){
        
        minute = hour%100;
        hour   = (hour - minute)/100;
      }

      if(matchedTokens[8]){
        
        second = matchedTokens[8];
        second = parseInt(second);
        if(second >= 60) return null;
      }
      
      if(matchedTokens[10]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[10].toLowerCase() == "am"){
          if(hour == 12) {
            hour = 0;
            if(!result.end) result.end = new chrono.DateComponents(result.start);
            result.end.day += 1;
          }
        }
        if(matchedTokens[10].toLowerCase() == "pm"){
          if(hour != 12) hour += 12;
        }
        
        if(!result.start.meridiem){
          if(matchedTokens[10].toLowerCase() == "am"){
            if(result.start.hour == 12) result.start.hour = 0;
          }
          if(matchedTokens[10].toLowerCase() == "pm"){
            if(result.start.hour != 12) result.start.hour += 12;
          }
          
          result.start.meridiem = matchedTokens[10].toLowerCase();
          result.start.impliedComponents = result.start.impliedComponents || [];
          result.start.impliedComponents.push('meridiem');
        }
      }
      
      
      result.text = result.text + matchedTokens[0];
      
      if(!result.end){
        result.end = new chrono.DateComponents(result.start);
        result.end.hour = hour;
        result.end.minute = minute;
        result.end.second = second;
      }else{
        result.end.hour = hour;
        result.end.minute = minute;
        result.end.second = second;
      }
      
      if(matchedTokens[10]) result.end.meridiem = matchedTokens[10].toLowerCase();
      if(hour >= 12) result.end.meridiem = 'pm';
      
      return new chrono.ParseResult(result);
    }
    
    
    parser.extractTimezone = function(text, result) {
      
      var PATTERN = /^\s*(GMT|UTC)(\+|\-)(\d{1,2})(\d{2})/;
      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);
      
      var matchedTokens = text.match(PATTERN);
      if(matchedTokens){
        var timezoneOffset = parseInt(matchedTokens[3])*60 + parseInt(matchedTokens[4])
        var timezoneOffset = parseInt(matchedTokens[2] + timezoneOffset)*(-1);
        if(result.end) result.end.timezoneOffset = timezoneOffset;
        result.start.timezoneOffset = timezoneOffset;
        result.text += matchedTokens[0];
        text = text.substr(matchedTokens[0].length);
      }
      
      var PATTERN = /^\s*\(?([A-Z]{3,4})\)?/;
      var matchedTokens = text.match(PATTERN);
      if(matchedTokens){
        var timezoneAbbr = matchedTokens[1];
        if(result.start.timezoneOffset === undefined){
          //var timezoneOffset = ??
          //if(result.end) result.end.timezoneOffset = timezoneOffset;
          //result.start.timezoneOffset = timezoneOffset;
          //result.text += matchedTokens[0];
        }
        
        result.text += matchedTokens[0];
      }
      
      return result;
    }
    
    /**
     * Parser.extractConcordance
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result
     * @return { CNResult } 
     */
    parser.extractConcordance = function(text, result) {
      
      var conLength =  30;
      
      preText = text.substr(0, result.index)
      preText = preText.replace(/(\r\n|\n|\r)/gm," ");
    	preText = preText.replace(/(\s+)/gm," ");
    	
    	if(preText.length > conLength)
    	  preText = '...' + preText.substr( preText.length - conLength +3, conLength-3)
    	else
        preText = preText.substr( 0, conLength)
        
      posText = text.substr(result.index+result.text.length)
      posText = posText.replace(/(\r\n|\n|\r)/gm," ");
    	posText = posText.replace(/(\s+)/gm," ");
    	
    	if(posText.length > conLength)
    	  posText = posText.substr(0, conLength - 3)+'...';
    	else
    	  posText = posText.substr(0, conLength)
      
      result.concordance = preText + result.text + posText;
      return new chrono.ParseResult(result);
    }
    
    
    /**
     * Parser.exec - Parse the text for one matching index.
     * @return { CNResult or NULL} 
     */
    parser.exec = function(){
      if(searchingFinished) return null;
      
      //Search for the pattern
  		var index  = searchingText.search( this.pattern() );
  		if(index < 0) {
  		  searchingFinished = true;
  		  return null; 
  		}
  		
  		//Extract the result
  		var matchedIndex = index + searchingIndex;
  		var result  = this.extract(text, matchedIndex);
  		if(result){ 
  		  
  		  if(searchingResults.length > 0){
  		   var oldResult = searchingResults[searchingResults.length - 1];
  		   var overlapResult = this.mergeOverlapResult(text, oldResult, result);
  		   
  		   result = overlapResult || result;
  		  }
  		  
  		  if(result.start.hour === undefined || (result.end && result.end.hour === undefined)){
  		    var timedResult = this.extractTime(text, result);
  		    result = timedResult || result; 
  		  }
  		  
  		  if(result.start.timezoneOffset === undefined || (result.end && result.end.timezoneOffset === undefined)){
  		    var resultWithTimezone = this.extractTimezone(text, result);
  		    result = resultWithTimezone || result; 
  		  }
  		  
  		  if(result.start.hour === undefined)
  		    result.startDate = moment(result.startDate).startOf('day').hours(12).toDate();
        
        if(result.end && result.end.hour === undefined)
    		  result.endDate = moment(result.endDate).startOf('day').hours(12).toDate();
        
        this.extractConcordance(text, result);
        
  		  searchingResults.push(result); 
  		}
  		
  		//Move on
  		searchingText = searchingText.substr(index + 1);
  		searchingIndex = matchedIndex + 1;
  		return result;
  	}
  	
  	/**
     * Parser.execAll - Parse the whole text.
     */
  	parser.execAll = function () {
  	  while(!this.finished()) this.exec();
  	}
  	
  	return parser;
  }
  
  chrono.Parser = Parser;
})();

