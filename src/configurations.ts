import { Configuration } from "./chrono";

import ExtractTimezoneAbbrRefiner from "./common/refiners/ExtractTimezoneAbbrRefiner";
import ExtractTimezoneOffsetRefiner from "./common/refiners/ExtractTimezoneOffsetRefiner";
import OverlapRemovalRefiner from "./common/refiners/OverlapRemovalRefiner";
import ForwardDateRefiner from "./common/refiners/ForwardDateRefiner";
import UnlikelyFormatFilter from "./common/refiners/UnlikelyFormatFilter";
import ISOFormatParser from "./common/parsers/ISOFormatParser";
import MergeWeekdayComponentRefiner from "./common/refiners/MergeWeekdayComponentRefiner";

export function includeCommonConfiguration(configuration: Configuration, strictMode = false): Configuration {
    configuration.parsers.unshift(new ISOFormatParser());

    configuration.refiners.unshift(new MergeWeekdayComponentRefiner());
    configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner());
    configuration.refiners.unshift(new OverlapRemovalRefiner());

    // Unlike ExtractTimezoneOffsetRefiner, this refiner relies on knowing both date and time in cases where the tz
    // is ambiguous (in terms of DST/non-DST). It therefore needs to be applied as late as possible in the parsing.
    configuration.refiners.push(new ExtractTimezoneAbbrRefiner());
    configuration.refiners.push(new OverlapRemovalRefiner());
    configuration.refiners.push(new ForwardDateRefiner());
    configuration.refiners.push(new UnlikelyFormatFilter(strictMode));
    return configuration;
}
