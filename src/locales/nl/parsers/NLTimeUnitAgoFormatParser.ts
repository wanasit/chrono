import { ParsingContext } from "../../../chrono";
import { parseDuration, TIME_UNITS_PATTERN } from "../constants";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";
import { reverseDuration } from "../../../calculation/duration";

const PATTERN = new RegExp("" + "(" + TIME_UNITS_PATTERN + ")" + "(?:geleden|voor|eerder)(?=(?:\\W|$))", "i");

const STRICT_PATTERN = new RegExp("" + "(" + TIME_UNITS_PATTERN + ")" + "geleden(?=(?:\\W|$))", "i");

export default class NLTimeUnitAgoFormatParser extends AbstractParserWithWordBoundaryChecking {
    constructor(private strictMode: boolean) {
        super();
    }

    innerPattern(): RegExp {
        return this.strictMode ? STRICT_PATTERN : PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray) {
        const timeUnits = parseDuration(match[1]);
        const outputTimeUnits = reverseDuration(timeUnits);

        return ParsingComponents.createRelativeFromReference(context.reference, outputTimeUnits);
    }
}
