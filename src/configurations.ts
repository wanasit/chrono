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
    configuration.refiners.unshift(new ExtractTimezoneAbbrRefiner());
    configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner());
    configuration.refiners.unshift(new OverlapRemovalRefiner());

    configuration.refiners.push(new OverlapRemovalRefiner());
    configuration.refiners.push(new ForwardDateRefiner());
    configuration.refiners.push(new UnlikelyFormatFilter(strictMode));
    return configuration;
}
