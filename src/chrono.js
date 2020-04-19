export class Chrono {

    constructor(option) {
        option = option || exports.options.casualOption();
        this.parsers = new Object(option.parsers);
        this.refiners = new Object(option.refiners);
    }

    parse(text, refDate, opt) {

        refDate = refDate || new Date();
        opt = opt || {};
        opt.forwardDate = opt.forwardDate || opt.forwardDate;

        var allResults = [];

        this.parsers.forEach(function (parser) {
            var results = parser.execute(text, refDate, opt);
            allResults = allResults.concat(results);
        });

        allResults.sort(function(a, b) {
            return a.index - b.index;
        });

        this.refiners.forEach(function (refiner) {
            allResults = refiner.refine(text, allResults, opt);
        });

        return allResults;
    }

    parseDate(text, refDate, opt) {
        var results = this.parse(text, refDate, opt);
        if (results.length > 0) {
            return results[0].start.date();
        }
        return null;
    }
}

import * as _options from './options';
import * as _parser from './parsers/parser';
import * as _refiner from './refiners/refiner';
import * as _result from './result';

export const options = _options;
export const parser = _parser;
export const refiner = _refiner;

export const Parser = parser.Parser;
export const Refiner = refiner.Refiner;
export const Filter = refiner.Filter;

export const ParsedResult = _result.ParsedResult;
export const ParsedComponents = _result.ParsedComponents;

export const strict = new Chrono( options.strictOption() );
export const casual = new Chrono( options.casualOption() );

export const en = new Chrono( options.mergeOptions([
    options.en.casual, options.commonPostProcessing]));

export const en_GB = new Chrono( options.mergeOptions([
    options.en_GB.casual, options.commonPostProcessing]));

export const de = new Chrono( options.mergeOptions([
    options.de.casual, options.en, options.commonPostProcessing]));

export const nl = new Chrono( options.mergeOptions([
    options.nl.casual, options.en, options.commonPostProcessing]));

export const pt = new Chrono( options.mergeOptions([
    options.pt.casual, options.en, options.commonPostProcessing]));

export const es = new Chrono( options.mergeOptions([
    options.es.casual, options.en, options.commonPostProcessing]));

export const fr = new Chrono( options.mergeOptions([
    options.fr.casual, options.en, options.commonPostProcessing]));

export const ja = new Chrono( options.mergeOptions([
    options.ja.casual, options.en, options.commonPostProcessing]));


export function parse () {
    return casual.parse.apply(casual, arguments);
}

export function parseDate() {
    return casual.parseDate.apply(casual, arguments);
}




