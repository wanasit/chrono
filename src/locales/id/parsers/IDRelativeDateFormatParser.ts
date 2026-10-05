import { ParsingContext } from "../../../chrono";
import { ParsingComponents } from "../../../results";
import { AbstractParserWithWordBoundaryChecking } from "../../../common/parsers/AbstractParserWithWordBoundary";

// minggu ini  |  bulan depan  |  tahun lalu  |  pekan berikutnya  |  bulan kemarin
const PATTERN = new RegExp(
    "(minggu|pekan|bulan|tahun)\\s+(ini|depan|berikutnya|mendatang|yang\\s+lalu|lalu|kemarin)(?=\\W|$)",
    "i"
);

const UNIT_WORD_GROUP = 1;
const MODIFIER_WORD_GROUP = 2;

const UNIT_WORD_TO_TIMEUNIT = {
    minggu: "week",
    pekan: "week",
    bulan: "month",
    tahun: "year",
};

export default class IDRelativeDateFormatParser extends AbstractParserWithWordBoundaryChecking {
    innerPattern(): RegExp {
        return PATTERN;
    }

    innerExtract(context: ParsingContext, match: RegExpMatchArray): ParsingComponents {
        const unitWord = match[UNIT_WORD_GROUP].toLowerCase();
        const modifier = match[MODIFIER_WORD_GROUP].toLowerCase().replace(/\s+/g, " ");
        const timeunit = UNIT_WORD_TO_TIMEUNIT[unitWord];

        if (modifier == "depan" || modifier == "berikutnya" || modifier == "mendatang") {
            return ParsingComponents.createRelativeFromReference(context.reference, { [timeunit]: 1 });
        }

        if (modifier == "lalu" || modifier == "yang lalu" || modifier == "kemarin") {
            return ParsingComponents.createRelativeFromReference(context.reference, { [timeunit]: -1 });
        }

        const components = context.createParsingComponents();
        const date = new Date(context.reference.instant.getTime());

        // This week
        if (timeunit == "week") {
            date.setDate(date.getDate() - date.getDay());
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.imply("year", date.getFullYear());
        }

        // This month
        else if (timeunit == "month") {
            date.setDate(1);
            components.imply("day", date.getDate());
            components.assign("year", date.getFullYear());
            components.assign("month", date.getMonth() + 1);
        }

        // This year
        else if (timeunit == "year") {
            date.setDate(1);
            date.setMonth(0);
            components.imply("day", date.getDate());
            components.imply("month", date.getMonth() + 1);
            components.assign("year", date.getFullYear());
        }

        return components;
    }
}
