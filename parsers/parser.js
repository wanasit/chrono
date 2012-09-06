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
    
    - (protected**) checkOverlapResult(text, result1, result2) :
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
     * Parser.checkOverlapResult
     * @param  { String }   text - Orginal text
     * @param  { CNResult } result1
     * @param  { CNResult } result2
     * @return { CNResult } 
     */
    parser.checkOverlapResult = function(text, result1, result2){

      if(result1.end || result2.end) return null;
      var begin = result1.index + result1.text.length;
      var end   = result2.index; 
      var textBetween = text.substring(begin,end);
      var OVERLAP_PATTERN = /^\s*(to|\-)\s*$/i;

      if(!textBetween.match(OVERLAP_PATTERN)) return null;
      var mergedText = result1.text + textBetween + result2.text;
      
      if(moment(result2.startDate).diff(moment(result1.startDate)) > 0){ 
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :result1.start,
          end   :result2.start,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      else{

        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :result2.start,
          end   :result1.start,
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
      
      var SUFFIX_PATTERN = /\s*(at)?\s*([0-9]{1,2})((\.|\:)([0-9]{1,2})((\.|\:)([0-9]{1,2}))?)?(\s*(AM|PM))?/i;
      
      if(text.length <= result.index + result.text.length) return null;
      text = text.substr(result.index + result.text.length);
      
      var matchedTokens = text.match(SUFFIX_PATTERN);
      if( !matchedTokens || text.indexOf(matchedTokens[0]) != 0) return null;
      
      var minute = 0;
      var second = 0;
      var hour = matchedTokens[2];
      hour = parseInt(hour);
      
      if(matchedTokens[10]){
        //AM & PM  
        if(hour > 12) return null;
        if(matchedTokens[10].toLowerCase() == "pm"){
         hour += 12;
        }
      }
      
      if(matchedTokens[5]){
        
        minute = matchedTokens[5];
        minute = parseInt(minute);
        if(minute >= 60) return null;
      }
      
      if(matchedTokens[8]){
        
        second = matchedTokens[8];
        second = parseInt(second);
        if(second >= 60) return null;
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
  		   var overlapResult = this.checkOverlapResult(text, oldResult, result);
  		   
  		   result = overlapResult || result;
  		  }
  		  
  		  if(result.start.hour === undefined || (result.end && result.end.hour === undefined)){
  		    var timedResult = this.extractTime(text, result);
  		    result = timedResult || result; 
  		  }
  		  
  		  if(result.start.hour === undefined)
  		    result.startDate = moment(result.startDate).sod().hours(12).toDate();
        
        if(result.end && result.end.hour === undefined)
    		  result.endDate = moment(result.endDate).sod().hours(12).toDate();

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

