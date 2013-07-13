/*
  
*/
(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  
  
  function TypoRemovingImprove (text, results, opt) {
    
    var improved_results = [];
    var PREFIX_TYPO_PATTERN = /(\W)\s*$/;
    var SUFFIX_TYPO_PATTERN = /^\s*(\W)/;
    
    for(var i=0; i< results.length; i++){
      
      var result = results[i];
      if(!result.concordance) {
        improved_results.push(result)
        continue;
      }
      var context = result.concordance;
      var indexInContext = context.indexOf(result.text);
      var prefix = context.substring(0,indexInContext);
      var suffix = context.substring(indexInContext+result.text.length);
      if(!suffix.match(SUFFIX_TYPO_PATTERN) && !prefix.match(PREFIX_TYPO_PATTERN)){
        improved_results.push(result)
        continue;
      }
      
      //Remove typo and try parsing again..
      context = prefix.replace(PREFIX_TYPO_PATTERN, ' ');
      context += result.text;
      context += suffix.replace(SUFFIX_TYPO_PATTERN, ' ');
      var parser = chrono.IntegratedParser(context, result.referrenceDate, opt); parser.execAll();
      var newResults = parser.results();
      
      if(newResults.length != 1 || newResults[0].text.length <= result.text.length){
        improved_results.push(result)
        continue;
      }
      
      var newResult = newResults[0];
      
      var typo_prefix = prefix.match(PREFIX_TYPO_PATTERN)[0];
      var typo_suffix = suffix.match(SUFFIX_TYPO_PATTERN)[0];
      var new_index = result.index - indexInContext + newResult.index - typo_prefix.length + 3;
      var new_length = newResult.text.length + typo_suffix.length - 1;
      
      newResult.text = text.substr(new_index, new_length)
      newResult.index = new_index
      improved_results.push(newResult)
    }
    
    return improved_results;
  }
  
  chrono.improvers.TypoRemovingImprove = TypoRemovingImprove;
})();

