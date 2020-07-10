import {Parser, ParsingContext} from "../../../chrono";
import {Meridiem} from "../../../index";

export default class ENCasualTimeParser implements Parser {

    pattern() { return /(?:this)?\s*(morning|afternoon|evening|night|noon)(?=\W|$)/i; }

    extract(context: ParsingContext, match: RegExpMatchArray) {
        const component = context.createParsingComponents()
        switch (match[1].toLowerCase()) {

            case 'afternoon':
                component.imply('meridiem', Meridiem.PM);
                component.imply('hour', 15);
                break;

            case 'evening':
            case 'night':
                component.imply('meridiem', Meridiem.PM);
                component.imply('hour', 20);
                break;

            case 'morning':
                component.imply('meridiem', Meridiem.AM);
                component.imply('hour', 6);
                break;

            case 'noon':
                component.imply('meridiem', Meridiem.AM);
                component.imply('hour', 12);
                break;
        }

        return component;
    }
}
