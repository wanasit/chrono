import { Configuration } from "../../chrono";

import ESTimeUnitWithinFormatParser from "./parsers/ESTimeUnitWithinFormatParser";
import ESMonthNameLittleEndianParser from "./parsers/ESMonthNameLittleEndianParser";
import ESMonthNameMiddleEndianParser from "./parsers/ESMonthNameMiddleEndianParser";
import ESMonthNameParser from "./parsers/ESMonthNameParser";
import ESCasualYearMonthDayParser from "./parsers/ESCasualYearMonthDayParser";
import ESSlashMonthFormatParser from "./parsers/ESSlashMonthFormatParser";
import ESTimeExpressionParser from "./parsers/ESTimeExpressionParser";
import ESTimeUnitAgoFormatParser from "./parsers/ESTimeUnitAgoFormatParser";
import ESTimeUnitLaterFormatParser from "./parsers/ESTimeUnitLaterFormatParser";
import ESMergeDateRangeRefiner from "./refiners/ESMergeDateRangeRefiner";
import ESMergeDateTimeRefiner from "./refiners/ESMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import ESCasualDateParser from "./parsers/ESCasualDateParser";
import ESCasualTimeParser from "./parsers/ESCasualTimeParser";
import ESWeekdayParser from "./parsers/ESWeekdayParser";
import ESRelativeDateFormatParser from "./parsers/ESRelativeDateFormatParser";

import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ESTimeUnitCasualRelativeFormatParser from "./parsers/ESTimeUnitCasualRelativeFormatParser";
import ESMergeRelativeDateRefiner from "./refiners/ESMergeRelativeDateRefiner";
import OverlapRemovalRefiner from "../../common/refiners/OverlapRemovalRefiner";

export default class ESDefaultConfiguration {
    /**
     * Create a default *casual* {@Link Configuration} for Spanish chrono.
     * It calls {@Link createConfiguration} and includes additional parsers.
     */
    createCasualConfiguration(littleEndian = true): Configuration {
        const option = this.createConfiguration(false, littleEndian);
        option.parsers.push(new ESCasualDateParser());
        option.parsers.push(new ESCasualTimeParser());
        option.parsers.push(new ESMonthNameParser());
        option.parsers.push(new ESRelativeDateFormatParser());
        option.parsers.push(new ESTimeUnitCasualRelativeFormatParser());
        return option;
    }

    /**
     * Create a default {@Link Configuration} for Spanish chrono
     *
     * @param strictMode If the timeunit mentioning should be strict, not casual
     * @param littleEndian If format should be date-first/littleEndian (e.g. es_ES), not month-first/middleEndian (e.g. en_US)
     */
    createConfiguration(strictMode = true, littleEndian = true): Configuration {
        const options = includeCommonConfiguration(
            {
                parsers: [
                    new SlashDateFormatParser(littleEndian),
                    new ESTimeUnitWithinFormatParser(),
                    new ESMonthNameLittleEndianParser(),
                    new ESMonthNameMiddleEndianParser(/*shouldSkipYearLikeDate=*/ littleEndian),
                    new ESWeekdayParser(),
                    new ESCasualYearMonthDayParser(),
                    new ESSlashMonthFormatParser(),
                    new ESTimeExpressionParser(strictMode),
                    new ESTimeUnitAgoFormatParser(strictMode),
                    new ESTimeUnitLaterFormatParser(strictMode),
                ],
                refiners: [new ESMergeDateTimeRefiner()],
            },
            strictMode
        );

        // These relative-dates consideration should be done before other common refiners.
        options.refiners.unshift(new ESMergeRelativeDateRefiner());
        options.refiners.unshift(new OverlapRemovalRefiner());

        // Re-apply the date time refiner again after the timezone refinement and exclusion in common refiners.
        options.refiners.push(new ESMergeDateTimeRefiner());

        // Keep the date range refiner at the end (after all other refinements).
        options.refiners.push(new ESMergeDateRangeRefiner());
        return options;
    }
}
