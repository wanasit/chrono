(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function Parser(text, ref, opt){
    
    var searchingIndex = 0;
    var searchingText = text;
    var searchingFinished = false;
    var searchingResults = [];
    
    var parser = {};
    
    //return REGEX
    parser.pattern = function() { return /./i; }
    
    //return RESULT
    parser.extract = function(text,index){ return null; };
    
    //return FINISHED
    parser.results = function(){ return searchingResults; }
    
    //return FINISHED
    parser.finished = function(){ return searchingFinished; }
    
    //
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
  		if(result){ searchingResults.push(result); }
  		
  		//Move on
  		searchingText = searchingText.substr(index + 1);
  		searchingIndex = matchedIndex + 1;
  		return result;
  	}
  	
  	parser.execAll = function () {
  	  while(!this.finished()) this.exec();
  	}
  	
  	return parser;
  }
  
  chrono.Parser = Parser;
})();

