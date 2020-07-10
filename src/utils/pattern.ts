

type DictionaryLike = string[] | {[word: string] : unknown} | Map<string, unknown>

export function patternWithWordBreak(regExp: RegExp) : RegExp {
    return RegExp('' + regExp.source)
}


export function extractTerms(dictionary: DictionaryLike): string[] {
    let keys: string[];
    if (dictionary instanceof Array) {
        keys = [...dictionary];
    } else if (dictionary instanceof Map) {
        keys = Array.from((dictionary as Map<string, unknown>).keys());
    } else {
        keys = Object.keys(dictionary);
    }

    return keys;
}


export function matchAnyPattern(dictionary: DictionaryLike) : string {
    // TODO: More efficient regex pattern by considering duplicated prefix

    const joinedTerms = extractTerms(dictionary)
        .sort((a, b) => b.length - a.length)
        .join('|')
        .replace(/\./g, '\\.')

    return `(?:${joinedTerms})`;
}