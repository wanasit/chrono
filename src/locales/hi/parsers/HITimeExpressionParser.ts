import { ParsingContext } from "../../../chrono";
import { ParsingComponents, ParsingResult } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { parseHindiDigits } from "../constants";

// Matches: सुबह 10 बजे, शाम 5:30 बजे, 10:30, ५ बजे
const PATTERN = /(?:(सुबह|प्रातः|दोपहर|शाम|रात)\s*)?([०-९0-9]{1,2})(?:(?:\s*:\s*([०-९0-9]{1,2}))|(?:\s*बजे))/i;

const MERIDIEM_GROUP = 1;
const HOUR_GROUP = 2;
const MINUTE_GROUP = 3;

export default class HITimeExpressionParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents | ParsingResult | null {
        const result = context.createParsingComponents();

        let hour = parseHindiDigits(match[HOUR_GROUP]);
        let minute = 0;

        // Parse minutes if they exist (e.g., 10:30)
        if (match[MINUTE_GROUP]) {
            minute = parseHindiDigits(match[MINUTE_GROUP]);
        }

        if (hour > 24 || minute >= 60) {
            return null;
        }

        // Handle AM/PM logic based on Hindi context words
        if (match[MERIDIEM_GROUP]) {
            const meridiemWord = match[MERIDIEM_GROUP];

            if (meridiemWord === "सुबह" || meridiemWord === "प्रातः") {
                result.assign("meridiem", 0); // AM
                if (hour === 12) hour = 0;
            } else if (meridiemWord === "शाम" || meridiemWord === "रात" || meridiemWord === "दोपहर") {
                result.assign("meridiem", 1); // PM
                if (hour < 12) hour += 12;
            }
        } else {
            // If no AM/PM is specified, imply it based on the number
            if (hour > 12) {
                result.assign("meridiem", 1); // PM
            }
        }

        result.assign("hour", hour);
        result.assign("minute", minute);

        return result;
    }
}
