/*
                                  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function integratedRefine (text, results, opt) {
    
    var orderedRefiners = {};
    for(var name in chrono.refiners){
      var refiner = chrono.refiners[name];
      orderedRefiners[refiner.order] = refiner;
    }
    
    for(var order in orderedRefiners){
      var refiner = orderedRefiners[order];
      results = refiner.refine(text, results, opt);
    }
    
    return results;
  }
  
  chrono.integratedRefine = integratedRefine;
})();

