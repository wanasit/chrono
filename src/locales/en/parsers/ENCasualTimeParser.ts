import {Parser, ParsingContext} from "../../../chrono";

export default class ENCasualTimeParser implements Parser {

    pattern() { return /(?<=\W|^)(?:this)?\s*(morning|afternoon|evening|noon)(?=\W|$)/i; }

    extract(match, context) {
        const component = context.createParsingComponents()
        switch (match[1].toLowerCase()) {

            case 'afternoon':
                component.imply('meridiem', 1);
                component.imply('hour', 15);
                break;

            case 'evening':
            case 'night':
                component.imply('meridiem', 1);
                component.imply('hour', 20);
                break;

            case 'morning':
                component.imply('meridiem', 0);
                component.imply('hour', 6);
                break;

            case 'noon':
                component.imply('meridiem', 0);
                component.imply('hour', 12);
                break;
        }

        return component;
    }
}
