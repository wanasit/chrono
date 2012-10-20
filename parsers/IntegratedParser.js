/*
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function IntegratedParser(text, ref, opt, parserTypes){
    
    opt = opt || {};
    ref = ref || new Date();
    parserTypes = parserTypes || Object.keys(chrono.parsers);
    
    var parser = chrono.Parser(text, ref, opt);
    var currentParserIndex = 0;
    var parsers = [];
		var results = [];
		
		//Initialize The Parsers
		for(var i=0; i<parserTypes.length;i++){
			if(chrono.parsers[parserTypes[i]])
				parsers.push(new chrono.parsers[parserTypes[i]] (text, ref, opt) );
		}
    
    parser.results = function(){ return results; }
    
    parser.finished = function(){ return currentParserIndex >= parsers.length;  }
    
    parser.exec = function(){
      
      if(currentParserIndex >= parsers.length) return;

			var currenParser = parsers[currentParserIndex];
			var result = currenParser.exec();

			if(result) insertResult (results, result);
			
			if(currenParser.finished()){
				currentParserIndex++;
			}
			return result;
  	}
  	
  	return parser;
  }
  
  function insertResult(results, newResult){
		
		//Find the place in the array that this result is belong to
		// Change to binary search later.
		var index = 0;
		while(index < results.length && results[index].index < newResult.index) index++;
		
		if(index < results.length){
			
			//Checking conflict with other results on the RIGHT side
			var overlapped_index = index;
			while(overlapped_index < results.length && results[overlapped_index].index < newResult.index + newResult.text.length)
			{
  			//Comapare length
				// If old value is longer, discard the newResult. 
				// SKIP the remaining operation
				if( results[overlapped_index].text.length >= newResult.text.length) return;
  			overlapped_index++;
			}
			
			results.splice(index,overlapped_index-index);
		}

		if(index-1 >= 0){
      
      //Checking conflict with other results on the LEFT side
			var oldResult = results[index-1];
			if(newResult.index < (oldResult.index + oldResult.text.length)){

				//Comapare length
				// If old value is longer, discard the newResult.
				// If new value is longer, discard the oldResult.
				if(oldResult.text.length >= newResult.text.length) return;
				else{
					results.splice(index-1,1);
					index = index-1;
				}
			}
		}

		results.splice(index,0,newResult);
		return results;
	}
  
  chrono.IntegratedParser = IntegratedParser;
  
})();

