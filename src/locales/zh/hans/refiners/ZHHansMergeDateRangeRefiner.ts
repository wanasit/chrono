import AbstractMergeDateRangeRefiner from "../../../../common/refiners/AbstractMergeDateRangeRefiner";

export default class ZHHansMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(至|到|-|~|～|－|ー)\s*$/i;
    }
}
