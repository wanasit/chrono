import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

/**
 * Merging date and time: "내일 오후 3시" (tomorrow 3 PM), "내일은 오후 3시" (tomorrow[topic] 3 PM).
 * 에 = at/on, 의 = of, 은/는 = topic markers.
 */
export default class KOMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return /^\s*(에|의|은|는)?\s*$/i;
    }
}
