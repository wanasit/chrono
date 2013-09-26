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
      
      if(result.start.hour === undefined) impliedComponents.push('hour')
      if(result.start.minute === undefined) impliedComponents.push('minute')
      
      impliedComponents.forEach(function(component) {
        if(refResult.start.isCertain(component)){
          result.start.imply(component, refResult.start[component])
        }
      }); 

      result.startDate = result.start.date();
      
      //Move day & month to match dayOfWeek
      if(!result.start.isCertain('day') && 
        !result.start.isCertain('month') &&
        result.start.isCertain('dayOfWeek')){
        
        var date = moment(result.start.date());
        date.day(result.start.dayOfWeek)
        result.start.day   = date.date();
        result.start.month = date.month();
      }
      
      if(result.start.dayOfWeek === undefined || impliedComponents.indexOf('dayOfWeek') >= 0){
        var date = moment(result.start.date());
        result.start.imply('dayOfWeek', date.day());
      }

      result.startDate = result.start.date();
    }
    return results;
  }
  
  chrono.refiners.MissingComponentsRefiner = {
    refine: MissingComponentsRefine,
    order: 500
  }
  
})();

