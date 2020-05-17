/*
  
*/


import {ParsingContext, Refiner} from "../../chrono";
import {ParsingResult} from "../../results";

const TIMEZONE_OFFSET_PATTERN = new RegExp("^\\s*(GMT|UTC)?([+-])(\\d{1,2}):?(\\d{2})", 'i');
const TIMEZONE_OFFSET_SIGN_GROUP = 2;
const TIMEZONE_OFFSET_HOUR_OFFSET_GROUP = 3;
const TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP = 4;

export default class ExtractTimezoneOffsetRefiner implements Refiner {

    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {

        results.forEach(function(result) {
            if (result.start.isCertain('timezoneOffset')) {
                return;
            }

            const suffix = context.text.substring(result.index + result.text.length);
            const match = TIMEZONE_OFFSET_PATTERN.exec(suffix);
            if (!match) {
                return;
            }

            context.debug(() => {
                console.log(`Extracting timezone: '${match[0]}' into : ${result}`)
            })

            const hourOffset = parseInt(match[TIMEZONE_OFFSET_HOUR_OFFSET_GROUP]);
            const minuteOffset = parseInt(match[TIMEZONE_OFFSET_MINUTE_OFFSET_GROUP]);
            let timezoneOffset = hourOffset * 60 + minuteOffset;
            if (match[TIMEZONE_OFFSET_SIGN_GROUP] === '-') {
                timezoneOffset = -timezoneOffset;
            }

            if (result.end != null) {
                result.end.assign('timezoneOffset', timezoneOffset);
            }

            result.start.assign('timezoneOffset', timezoneOffset);
            result.text += match[0];
        });

        return results;
    }
}
