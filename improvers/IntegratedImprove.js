/*
                                  
  
*/

(function () {
  
  if(typeof chrono == 'undefined')
    throw 'Cannot find the chrono main module';
  
  function IntegratedImprove (text, results, opt) {
    
    for(var name in chrono.improvers){
      var improve = chrono.improvers[name];
      results = improve(text, results, opt);
    }
    
    return results;
  }
  
  chrono.IntegratedImprove = IntegratedImprove;
})();

