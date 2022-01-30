import AbstractMergeDateTimeRefiner from "../../../../common/refiners/AbstractMergeDateTimeRefiner";

export default class ZHHansMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return /^\s*$/i;
    }
}
