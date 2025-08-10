import { OpUnitType, QUnitType } from "dayjs";
import { ParsingComponents } from "../results";

/**
 * @deprecated Use `calculation.duration.Duration`.
 */
export type TimeUnits = { [c in OpUnitType | QUnitType]?: number };
