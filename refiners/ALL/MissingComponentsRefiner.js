/*
  
*/
(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function MissingComponentsRefine (text, results, opt) {
    
    if(results.length < 2) return results;
    
    for(var i = 0; i< results.length; i++){
      
      var refResult = null;
      var result = results[i]
      
      if(!results[i+1]) refResult = results[i-1]
      else if(!results[i-1]) refResult = results[i+1]
      else{
        var nextResult = results[i+1];
        var distanceNextResult = nextResult.index - (result.index + result.text.length);
        var prevResult = results[i-1];
        var distancePrevResult = result.index - (prevResult.index + prevResult.text.length);
        
        if(distancePrevResult > distanceNextResult) refResult = nextResult;
        else refResult = prevResult
      }
      
      
      var impliedComponents = result.start.impliedComponents || [];
      var refImpliedComponents = refResult.start.impliedComponents || [];
      
      if(!result.start.hour) impliedComponents.push('hour')
      if(!result.start.minute) impliedComponents.push('minute')
      
      impliedComponents.forEach(function(component) {
        if(refImpliedComponents.indexOf(component) < 0 && refResult.start[component]){
          result.start[component] = refResult.start[component]
        } 
      }); 
      
      result.start.impliedComponents = impliedComponents;
    }
    return results;
  }
  
  chrono.refiners.MissingComponentsRefiner = {
    refine: MissingComponentsRefine,
    order: 500
  }
  
})();

