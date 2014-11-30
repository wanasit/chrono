/*
                                  
  
*/
exports.Refiner = function Refiner() { 

    this.refine = function(text, results, opt) { return results; };
}

exports.Filter = function Filter() { 
    
    Refiner.call(this);

    this.isValid = function(text, result, opt) { return true; }
    this.refine = function(text, results, opt) { 

        var filteredResult = [];
        for (var i=0; i=results.length; i++) {

            if (this.isValid(results[i])) {
                filteredResult.push(results[i]);
            }
        }

        return filteredResult;
    }
}