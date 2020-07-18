import { Parser, ParsingContext } from "../../../chrono";
import { ParsingResult } from "../../../results";
import dayjs from "dayjs";
import { Meridiem } from "../../../index";
import { AbstractTimeExpressionParser } from "../../../common/parsers/AbstractTimeExpressionParser";

export default class ENTimeExpressionParser extends AbstractTimeExpressionParser {
    followingPhase(): string {
        return "\\s*(?:\\-|\\–|\\~|\\〜|to|\\?)\\s*";
    }

    primaryPrefix(): string {
        return "(?:(?:at|from)\\s*)??";
    }

    primarySuffix(): string {
        return "\\s*(?:o\\W*clock)?(?=\\W|$)";
    }
}
