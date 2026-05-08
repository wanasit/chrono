import { Chrono } from "../../chrono";
import { ParsingOption, ParsingReference, ParsedResult } from "../../types";

import HIMonthNameLittleEndianParser from "./parsers/HIMonthNameLittleEndianParser";
import HICasualDateParser from "./parsers/HICasualDateParser";
import HITimeExpressionParser from "./parsers/HITimeExpressionParser";

export const casual = new Chrono();

casual.parsers.push(new HICasualDateParser());
casual.parsers.push(new HIMonthNameLittleEndianParser());
casual.parsers.push(new HITimeExpressionParser());

export function parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[] {
    return casual.parse(text, ref, option);
}

export function parseDate(text: string, ref?: ParsingReference | Date, option?: ParsingOption): Date | null {
    return casual.parseDate(text, ref, option);
}

export default casual;
