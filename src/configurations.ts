
import ExtractTimezoneAbbrRefiner from "./common/refiners/ExtractTimezoneAbbrRefiner";
import ExtractTimezoneOffsetRefiner from "./common/refiners/ExtractTimezoneOffsetRefiner";
import OverlapRemovalRefiner from "./common/refiners/OverlapRemovalRefiner";
import UnlikelyFormatFilter from "./common/refiners/UnlikelyFormatFilter";

import {Configuration} from "./chrono";

export function includeCommonConfiguration(configuration: Configuration): Configuration {

    configuration.refiners.unshift(new ExtractTimezoneAbbrRefiner())
    configuration.refiners.unshift(new ExtractTimezoneOffsetRefiner())
    configuration.refiners.unshift(new OverlapRemovalRefiner())
    configuration.refiners.push(new UnlikelyFormatFilter())
    return configuration;
}
