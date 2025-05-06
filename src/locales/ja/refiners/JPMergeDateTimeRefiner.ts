import AbstractMergeDateTimeRefiner from "../../../common/refiners/AbstractMergeDateTimeRefiner";

export default class JPMergeDateTimeRefiner extends AbstractMergeDateTimeRefiner {
    patternBetween(): RegExp {
        return /^\s*(の)?\s*$/i;
    }
}
