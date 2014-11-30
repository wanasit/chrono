/*
  
*/
var Refiner = require('../refiner').Refiner;

function mergeRangeResult(text, result1, result2){
      
    if(result2.index < result1.index){
        var tmp = result1; result1 = result2; result2 = tmp;
    }
      
    var begin = result1.index + result1.text.length;
    var end   = result2.index; 
    if(end < begin &&  result1.index < result2.index && begin < result2.index + result2.text.length){
        var mergedIndex = result1.index;
        var mergedText = text.substring(result1.index, result2.index+result2.text.length);
        var impliedComponents1 = result1.start.impliedComponents || [];
        var impliedComponents2 = result2.start.impliedComponents || [];
        
    if(impliedComponents1.length < impliedComponents2.length){
        var tmp = result1; result1 = result2; result2 = tmp;
        impliedComponents1 = result1.start.impliedComponents || [];
        impliedComponents2 = result2.start.impliedComponents || [];
    }    
        
        if(impliedComponents1.indexOf('day') < 0 || impliedComponents1.indexOf('month') < 0 || impliedComponents1.indexOf('year') < 0)
          return;
        
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :mergedIndex,
          start :result2.start,
          end   :result2.end,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
    }
      
      var textBetween = text.substring(begin,end);
      
      var OVERLAP_PATTERN = /^\s*(to|\-)\s*$/i;
      if(!textBetween.match(OVERLAP_PATTERN)) return null;
      var mergedText = result1.text + textBetween + result2.text;
      
      var components1 = new Object(result1.start);
      var components2 = new Object(result2.start);
      var impliedComponents1 = result1.start.impliedComponents || [];
      var impliedComponents2 = result2.start.impliedComponents || [];
      
      impliedComponents1.forEach(function(unknown_component) {
        if(components2.isCertain(unknown_component)){
          components1.assign(unknown_component, components2[unknown_component]);
        } 
      });

      impliedComponents2.forEach(function(unknown_component) {
        if(components1.isCertain(unknown_component)){
          components2.assign(unknown_component, components1[unknown_component]);
        }
      });
      
      if(moment(components2.date()).diff(moment(components1.date())) > 0){ 
        
        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components1,
          end   :components2,
          text:mergedText,
          referenceDate :result1.referenceDate,
        });
      }
      else{

        return new chrono.ParseResult({
          referenceDate:result1.ref,
          index :result1.index,
          start :components2,
          end   :components1,
          text  :mergedText,
          referenceDate :result1.referenceDate,
        });
      }

    }
    



exports.Refiner = function ENMergeDateRangeRefiner() {
    Refiner.call(this);






}