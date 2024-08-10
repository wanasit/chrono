import { ParsingContext, Refiner } from "../../../chrono";
import { ParsingResult } from "../../../results";
import { YEAR_PATTERN, parseYear } from "../constants";

const YEAR_SUFFIX_PATTERN = new RegExp(`^\\s*(${YEAR_PATTERN})`, "i");
const YEAR_GROUP = 1;
export default class ENExtractYearSuffixRefiner implements Refiner {
    refine(context: ParsingContext, results: ParsingResult[]): ParsingResult[] {
        results.forEach(function (result) {
            if (!result.start.isDateWithUnknownYear()) {
                return;
            }

            const suffix = context.text.substring(result.index + result.text.length);
            const match = YEAR_SUFFIX_PATTERN.exec(suffix);
            if (!match) {
                return;
            }

            context.debug(() => {
                console.log(`Extracting year: '${match[0]}' into : ${result}`);
            });

            const year = parseYear(match[YEAR_GROUP]);
            if (result.end != null) {
                result.end.assign("year", year);
            }
            result.start.assign("year", year);
            result.text += match[0];
        });

        return results;
    }
}
