import { Configuration } from "../../chrono";

import ENTimeUnitWithinFormatParser from "./parsers/ENTimeUnitWithinFormatParser";
import ENMonthNameLittleEndianParser from "./parsers/ENMonthNameLittleEndianParser";
import ENMonthNameMiddleEndianParser from "./parsers/ENMonthNameMiddleEndianParser";
import ENMonthNameParser from "./parsers/ENMonthNameParser";
import ENYearMonthDayParser from "./parsers/ENYearMonthDayParser";
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
import ENMergeRelativeAfterDateRefiner from "./refiners/ENMergeRelativeAfterDateRefiner";
import ENMergeRelativeFollowByDateRefiner from "./refiners/ENMergeRelativeFollowByDateRefiner";
import OverlapRemovalRefiner from "../../common/refiners/OverlapRemovalRefiner";
import ENExtractYearSuffixRefiner from "./refiners/ENExtractYearSuffixRefiner";
import ENUnlikelyFormatFilter from "./refiners/ENUnlikelyFormatFilter";

export default class ENDefaultConfiguration {
    /**
     * Create a default *casual* {@Link Configuration} for English chrono.
     * It calls {@Link createConfiguration} and includes additional parsers.
     */
    createCasualConfiguration(littleEndian = false): Configuration {
        const option = this.createConfiguration(false, littleEndian);
        option.parsers.push(new ENCasualDateParser());
        option.parsers.push(new ENCasualTimeParser());
        option.parsers.push(new ENMonthNameParser());
        option.parsers.push(new ENRelativeDateFormatParser());
        option.parsers.push(new ENTimeUnitCasualRelativeFormatParser());
        option.refiners.push(new ENUnlikelyFormatFilter());
        return option;
    }

    /**
     * Create a default {@Link Configuration} for English chrono
     *
     * @param strictMode If the timeunit mentioning should be strict, not casual
     * @param littleEndian If format should be date-first/littleEndian (e.g. en_UK), not month-first/middleEndian (e.g. en_US)
     */
    createConfiguration(strictMode = true, littleEndian = false): Configuration {
        const options = includeCommonConfiguration(
            {
                parsers: [
                    new SlashDateFormatParser(littleEndian),
                    new ENTimeUnitWithinFormatParser(strictMode),
                    new ENMonthNameLittleEndianParser(),
                    new ENMonthNameMiddleEndianParser(/*shouldSkipYearLikeDate=*/ littleEndian),
                    new ENWeekdayParser(),
                    new ENSlashMonthFormatParser(),
                    new ENTimeExpressionParser(strictMode),
                    new ENTimeUnitAgoFormatParser(strictMode),
                    new ENTimeUnitLaterFormatParser(strictMode),
                ],
                refiners: [new ENMergeDateTimeRefiner()],
            },
            strictMode
        );
        options.parsers.unshift(new ENYearMonthDayParser(/*strictMonthDateOrder=*/ strictMode));

        // These relative-dates consideration should be done before other common refiners.
        options.refiners.unshift(new ENMergeRelativeFollowByDateRefiner());
        options.refiners.unshift(new ENMergeRelativeAfterDateRefiner());
        options.refiners.unshift(new OverlapRemovalRefiner());

        // Re-apply the date time refiner again after the timezone refinement and exclusion in common refiners.
        options.refiners.push(new ENMergeDateTimeRefiner());

        // Extract year after merging date and time
        options.refiners.push(new ENExtractYearSuffixRefiner());

        // Keep the date range refiner at the end (after all other refinements).
        options.refiners.push(new ENMergeDateRangeRefiner());
        return options;
    }
}
