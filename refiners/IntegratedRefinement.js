/*
                                  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function integratedRefine (text, results, opt) {
    
    var orderedRefiners = {};
    for(var name in this.refiners){
      var refiner = this.refiners[name];
      var order = refiner.order || 0;
      orderedRefiners[order] = orderedRefiners[order] || [];
      orderedRefiners[order].push(refiner);
    }
    
    for(var order in orderedRefiners){
      orderedRefiners[order].forEach(function(refiner) {
        results = refiner.refine(text, results, opt);
      })
    }
    
    return results;
  }
  
  chrono.integratedRefine = integratedRefine;
})();

