import { Configuration } from "../../chrono";

import ITTimeUnitWithinFormatParser from "./parsers/ITTimeUnitWithinFormatParser";
import ITMonthNameLittleEndianParser from "./parsers/ITMonthNameLittleEndianParser";
import ITMonthNameMiddleEndianParser from "./parsers/ITMonthNameMiddleEndianParser";
import ITMonthNameParser from "./parsers/ITMonthNameParser";
import ITYearMonthDayParser from "./parsers/ITYearMonthDayParser";
import ITSlashMonthFormatParser from "./parsers/ITSlashMonthFormatParser";
import ITTimeExpressionParser from "./parsers/ITTimeExpressionParser";
import ITTimeUnitAgoFormatParser from "./parsers/ITTimeUnitAgoFormatParser";
import ITTimeUnitLaterFormatParser from "./parsers/ITTimeUnitLaterFormatParser";
import ITMergeDateRangeRefiner from "./refiners/ITMergeDateRangeRefiner";
import ITMergeDateTimeRefiner from "./refiners/ITMergeDateTimeRefiner";

import { includeCommonConfiguration } from "../../configurations";
import ITCasualDateParser from "./parsers/ITCasualDateParser";
import ITCasualTimeParser from "./parsers/ITCasualTimeParser";
import ITWeekdayParser from "./parsers/ITWeekdayParser";
import ITRelativeDateFormatParser from "./parsers/ITRelativeDateFormatParser";

import SlashDateFormatParser from "../../common/parsers/SlashDateFormatParser";
import ITTimeUnitCasualRelativeFormatParser from "./parsers/ITTimeUnitCasualRelativeFormatParser";
import ITMergeRelativeAfterDateRefiner from "./refiners/ITMergeRelativeAfterDateRefiner";
import ITMergeRelativeFollowByDateRefiner from "./refiners/ITMergeRelativeFollowByDateRefiner";
import OverlapRemovalRefiner from "../../common/refiners/OverlapRemovalRefiner";
import ITExtractYearSuffixRefiner from "./refiners/ITExtractYearSuffixRefiner";
import ITUnlikelyFormatFilter from "./refiners/ITUnlikelyFormatFilter";

export default class ITDefaultConfiguration {
    /**
     * Create a default *casual* {@Link Configuration} for Italian chrono.
     * It calls {@Link createConfiguration} and includes additional parsers.
     */
    createCasualConfiguration(): Configuration {
        const option = this.createConfiguration(false);
        option.parsers.push(new ITCasualDateParser());
        option.parsers.push(new ITCasualTimeParser());
        option.parsers.push(new ITMonthNameParser());
        option.parsers.push(new ITRelativeDateFormatParser());
        option.parsers.push(new ITTimeUnitCasualRelativeFormatParser());
        option.refiners.push(new ITUnlikelyFormatFilter());
        return option;
    }

    /**
     * Create a default {@Link Configuration} for Italian chrono
     *
     * @param strictMode If the timeunit mentioning should be strict, not casual
     */
    createConfiguration(strictMode = true): Configuration {
        const options = includeCommonConfiguration(
            {
                parsers: [
                    new SlashDateFormatParser(true), // Italian uses day/month/year format (littleEndian)
                    new ITTimeUnitWithinFormatParser(strictMode),
                    new ITMonthNameLittleEndianParser(),
                    new ITMonthNameMiddleEndianParser(/*shouldSkipYearLikeDate=*/ true),
                    new ITWeekdayParser(),
                    new ITSlashMonthFormatParser(),
                    new ITTimeExpressionParser(strictMode),
                    new ITTimeUnitAgoFormatParser(strictMode),
                    new ITTimeUnitLaterFormatParser(strictMode),
                ],
                refiners: [new ITMergeDateTimeRefiner()],
            },
            strictMode
        );
        options.parsers.unshift(new ITYearMonthDayParser(/*strictMonthDateOrder=*/ strictMode));

        // These relative-dates consideration should be done before other common refiners.
        options.refiners.unshift(new ITMergeRelativeFollowByDateRefiner());
        options.refiners.unshift(new ITMergeRelativeAfterDateRefiner());
        options.refiners.unshift(new OverlapRemovalRefiner());

        // Re-apply the date time refiner again after the timezone refinement and exclusion in common refiners.
        options.refiners.push(new ITMergeDateTimeRefiner());

        // Extract year after merging date and time
        options.refiners.push(new ITExtractYearSuffixRefiner());

        // Keep the date range refiner at the end (after all other refinements).
        options.refiners.push(new ITMergeDateRangeRefiner());
        return options;
    }
}
