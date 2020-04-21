/*

*/
var ParsedComponents = require('../../result').ParsedComponents;
var Refiner = require('../refiner').Refiner;

var mergeDateTimeComponent = require('../en/ENMergeDateTimeRefiner').mergeDateTimeComponent;
var isDateOnly = require('../en/ENMergeDateTimeRefiner').isDateOnly;
var isTimeOnly = require('../en/ENMergeDateTimeRefiner').isTimeOnly;

var PATTERN = new RegExp("^\\s*(T|op|om|voor|na|van|,|-)\\s*$");

function isAbleToMerge(text, prevResult, curResult) {
    var textBetween = text.substring(prevResult.index + prevResult.text.length, curResult.index);
    return textBetween.match(PATTERN);
}

function mergeResult(text, dateResult, timeResult){

    var beginDate = dateResult.start;
    var beginTime = timeResult.start;
    var beginDateTime = mergeDateTimeComponent(beginDate, beginTime);

    if (dateResult.end != null || timeResult.end != null) {

        var endDate   = dateResult.end == null ? dateResult.start : dateResult.end;
        var endTime   = timeResult.end == null ? timeResult.start : timeResult.end;
        var endDateTime = mergeDateTimeComponent(endDate, endTime);

        if (dateResult.end == null && endDateTime.date().getTime() < beginDateTime.date().getTime()) {
            // Ex. 9pm - 1am
            if (endDateTime.isCertain('day')) {
                endDateTime.assign('day', endDateTime.get('day') + 1);
            } else {
                endDateTime.imply('day', endDateTime.get('day') + 1);
            }
        }

        dateResult.end = endDateTime;
    }

    dateResult.start = beginDateTime;

    var startIndex = Math.min(dateResult.index, timeResult.index);
    var endIndex = Math.max(
            dateResult.index + dateResult.text.length,
            timeResult.index + timeResult.text.length);

    dateResult.index = startIndex;
    dateResult.text  = text.substring(startIndex, endIndex);

    for (var tag in timeResult.tags) {
        dateResult.tags[tag] = true;
    }
    dateResult.tags['NLMergeDateAndTimeRefiner'] = true;
    return dateResult;
}

exports.Refiner = function NLMergeDateTimeRefiner() {
    Refiner.call(this);


    this.refine = function(text, results, opt) {

        if (results.length < 2) return results;

        var mergedResult = [];
        var currResult = null;
        var prevResult = null;

        for (var i = 1; i < results.length; i++) {

            currResult = results[i];
            prevResult = results[i-1];
            if (isDateOnly(currResult) && isTimeOnly(prevResult)
                    && isAbleToMerge(text, prevResult, currResult)) {

                prevResult = mergeResult(text, currResult, prevResult);
                currResult = null;
                i += 1;
                mergedResult.push(prevResult);
            }else if(!isTimeOnly(prevResult)){
                mergedResult.push(prevResult);
            }

        }

        if (currResult != null) {
            mergedResult.push(currResult);
        }

        return mergedResult;
    }
}
