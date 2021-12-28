import AbstractMergeDateTimeRefiner from "../../../../common/refiners/AbstractMergeDateTimeRefiner";

export default class ZHHantMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return /^\s*$/i;
    }
}
