import { ParsingComponents } from "../results";
import { Timeunit } from "../types";

/**
 * Returns a new ParsingComponents object with the given time units set as "implied" components.
 *
 * @param components
 * @param timeUnits
 */
export function addImpliedTimeUnits(
    components: ParsingComponents,
    timeUnits: { [c in Timeunit]?: number }
): ParsingComponents {
    const newComponents = components.clone();
    for (const key in timeUnits) {
        if (key === "week" || key === "quarter") {
            continue;
        }
        if (newComponents.isCertain(key as any)) {
            continue;
        }
        newComponents.imply(key as any, timeUnits[key as Timeunit]);
    }
    return newComponents;
}
