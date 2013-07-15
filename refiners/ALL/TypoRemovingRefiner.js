/*
  
*/
(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function TypoRemovingRefine (text, results, opt) {
    
    var improved_results = [];
    var SUFFIX_TYPO_PATTERN = /^\s*(\W)/;
    
    for(var i=0; i< results.length; i++){
      
      var result = results[i];
      if(!result.concordance) {
        improved_results.push(result)
        continue;
      }

      var suffix = text.substring(result.index+result.text.length);
      var suffixTypo = suffix.match(SUFFIX_TYPO_PATTERN);
      if(!suffixTypo){
        improved_results.push(result)
        continue;
      }
      
      //Remove typo and try parsing again...
      var context = result.text;
      context += suffix.replace(suffixTypo[0], ' ');
      
      var newResults = chrono.integratedParse(context, result.referrenceDate, opt)
      if(newResults.length < 1 || newResults[0].text.length <= result.text.length){
        improved_results.push(result)
        continue;
      }
      
      var newResult = newResults[0];
      
      var new_index = result.index + newResult.index;
      var new_length = newResult.text.length + suffixTypo[0].length - 1;
      
      newResult.index = new_index
      newResult.text = text.substr(new_index, new_length)
      newResult.concordance = chrono.Parser(text).extractConcordance(text,newResult);
      improved_results.push(newResult)
    }
    
    return improved_results;
  }
  
  chrono.refiners.TypoRemovingRefiner = {
    refine: TypoRemovingRefine,
    order: 100
  }
  
})();

