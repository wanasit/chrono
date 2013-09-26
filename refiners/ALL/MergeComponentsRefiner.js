/*
  
*/
(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function MergeComponentsRefine (text, results, opt) {
    
    if(results.length < 2) return results;
    var new_results = [];
    for(var i = 0; i< results.length-1; i++){
      
      var refResult = results[i+1];
      var result    = results[i];
      var textBetween = text.substring(result.index + result.text.length, refResult.index);
      
      var OVERLAP_PATTERN = /^\s*(of|on|\W)?\s*$/i;
      if(!textBetween.match(OVERLAP_PATTERN)) {
        new_results.push(result);
        continue;
      }
      
      if(result.start.hour === undefined){
        if(refResult.start.hour === undefined) { 
          new_results.push(result);
          continue;
        }
        var dateComponents = new Object(result.start);
        var timeComponents = new Object(refResult.start);
      }else{
        if(refResult.start.hour !== undefined) { 
          new_results.push(result);
          continue;
        }
        
        var timeComponents = new Object(result.start);
        var dateComponents= new Object(refResult.start);
      }
      dateComponents.hour  = timeComponents.hour;
      dateComponents.minute = timeComponents.minute;
      dateComponents.second = timeComponents.second;
      dateComponents.meridiem = timeComponents.meridiem;
      dateComponents.impliedComponents = dateComponents.impliedComponents || [];
      result.start = new chrono.DateComponents(dateComponents);
      
      if(result.end || refResult.end){
        if(result.start.hour !== undefined){
          timeComponents = result.end || timeComponents;
          dateComponents = refResult.end || dateComponents;
        }else{
          dateComponents = result.end || dateComponents;
          timeComponents = refResult.end || timeComponents;
        }
        
        dateComponents.hour  = timeComponents.hour;
        dateComponents.minute = timeComponents.minute;
        dateComponents.second = timeComponents.second;
        dateComponents.impliedComponents = dateComponents.impliedComponents || [];
        result.end = new chrono.DateComponents(dateComponents);
      }
      
      result.text = result.text + textBetween + refResult.text;
      new_results.push(new chrono.ParseResult(result));
      i++;
    }
    
    //if we haven't merged the last result
    if(i < results.length) new_results.push(results[i])
    return new_results;
  }
  
  chrono.refiners.MergeComponentsRefine = {
    refine: MergeComponentsRefine
  }
  
})();

