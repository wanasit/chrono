/*
  
*/

import AbstractMergeDateRangeRefiner from "../../../common/refiners/AbstractMergeDateRangeRefiner";

/**
 * Merging before and after results (see. AbstractMergeDateRangeRefiner)
 *
 */
export default class FRMergeDateRangeRefiner extends AbstractMergeDateRangeRefiner {
    patternBetween(): RegExp {
        return /^\s*(bis(?:\s*(?:am|zum))?|-)\s*$/i;
    }
}
