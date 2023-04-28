import { Configuration } from "../../chrono";

import ENTimeUnitWithinFormatParser from "./parsers/ENTimeUnitWithinFormatParser";
import ENMonthNameLittleEndianParser from "./parsers/ENMonthNameLittleEndianParser";
import ENMonthNameMiddleEndianParser from "./parsers/ENMonthNameMiddleEndianParser";
import ENMonthNameParser from "./parsers/ENMonthNameParser";
import ENCasualYearMonthDayParser from "./parsers/ENCasualYearMonthDayParser";
import ENSlashMonthFormatParser from "./parsers/ENSlashMonthFormatParser";
import ENTimeExpressionParser from "./parsers/ENTimeExpressionParser";
import ENTimeUnitAgoFormatParser from "./parsers/ENTimeUnitAgoFormatParser";
import ENTimeUnitLaterFormatParser from "./parsers/ENTimeUnitLaterFormatParser";
import ENMergeDateRangeRefiner from "./refiners/ENMergeDateRangeRefiner";
import ENMergeDateTimeRefiner from "./refiners/ENMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import ENCasualDateParser from "./parsers/ENCasualDateParser";
import ENCasualTimeParser from "./parsers/ENCasualTimeParser";
import ENWeekdayParser from "./parsers/ENWeekdayParser";
import ENRelativeDateFormatParser from "./parsers/ENRelativeDateFormatParser";

import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ENTimeUnitCasualRelativeFormatParser from "./parsers/ENTimeUnitCasualRelativeFormatParser";
import ENMergeRelativeDateRefiner from "./refiners/ENMergeRelativeDateRefiner";

export default class ENDefaultConfiguration {
    /**
     * Create a default *casual* {@Link Configuration} for English chrono.
     * It calls {@Link createConfiguration} and includes additional parsers.
     */
    createCasualConfiguration(littleEndian = false): Configuration {
        const option = this.createConfiguration(false, littleEndian);
        option.parsers.unshift(new ENCasualDateParser());
        option.parsers.unshift(new ENCasualTimeParser());
        option.parsers.unshift(new ENMonthNameParser());
        option.parsers.unshift(new ENRelativeDateFormatParser());
        option.parsers.unshift(new ENTimeUnitCasualRelativeFormatParser());
        return option;
    }

    /**
     * Create a default {@Link Configuration} for English chrono
     *
     * @param strictMode If the timeunit mentioning should be strict, not casual
     * @param littleEndian If format should be date-first/littleEndian (e.g. en_UK), not month-first/middleEndian (e.g. en_US)
     */
    createConfiguration(strictMode = true, littleEndian = false): Configuration {
        return includeCommonConfiguration(
            {
                parsers: [
                    new SlashDateFormatParser(littleEndian),
                    new ENTimeUnitWithinFormatParser(strictMode),
                    new ENMonthNameLittleEndianParser(),
                    new ENMonthNameMiddleEndianParser(),
                    new ENWeekdayParser(),
                    new ENCasualYearMonthDayParser(),
                    new ENSlashMonthFormatParser(),
                    new ENTimeExpressionParser(strictMode),
                    new ENTimeUnitAgoFormatParser(strictMode),
                    new ENTimeUnitLaterFormatParser(strictMode),
                ],
                refiners: [
                    new ENMergeRelativeDateRefiner(),
                    new ENMergeDateTimeRefiner(),
                    new ENMergeDateRangeRefiner(),
                ],
            },
            strictMode
        );
    }
}
