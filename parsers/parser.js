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
     * Parser.exec - Parse the text for one matching index.
     * @return { CNParser or NULL} 
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
  		  
  		  if(result.start.hour === undefined)
  		    result.startDate = moment(result.startDate).sod().hours(12).toDate();
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

