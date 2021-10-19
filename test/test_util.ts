import { BufferedDebugHandler } from "../src/debugging";
import { en, ParsedResult, ParsingOption, ParsingReference } from "../src";

interface ChronoLike {
    parse(text: string, ref?: ParsingReference | Date, option?: ParsingOption): ParsedResult[];
}

type CheckResult = (p: ParsedResult, text: string) => void;

export function testSingleCase(chrono: ChronoLike, text: string, checkResult?: CheckResult);
export function testSingleCase(
    chrono: ChronoLike,
    text: string,
    refDateOrCheckResult?: ParsingReference | Date | CheckResult,
    checkResult?: CheckResult
);
export function testSingleCase(
    chrono: ChronoLike,
    text: string,
    refDateOrCheckResult?: ParsingReference | Date | CheckResult,
    optionOrCheckResult?: ParsingOption | CheckResult,
    checkResult?: CheckResult
);
export function testSingleCase(
    chrono: ChronoLike,
    text: string,
    refDateOrCheckResult?: ParsingReference | Date | CheckResult,
    optionOrCheckResult?: ParsingOption | CheckResult,
    checkResult?: CheckResult
) {
    if (checkResult === undefined && typeof optionOrCheckResult === "function") {
        checkResult = optionOrCheckResult;
        optionOrCheckResult = undefined;
    }

    if (optionOrCheckResult === undefined && typeof refDateOrCheckResult === "function") {
        checkResult = refDateOrCheckResult;
        refDateOrCheckResult = undefined;
    }

    const debugHandler = new BufferedDebugHandler();
    optionOrCheckResult = (optionOrCheckResult as ParsingOption) || {};
    optionOrCheckResult.debug = debugHandler;

    try {
        const results = chrono.parse(text, refDateOrCheckResult as Date, optionOrCheckResult);
        expect(results).toBeSingleOnText(text);
        if (checkResult) {
            checkResult(results[0], text);
        }
    } catch (e) {
        debugHandler.executeBufferedBlocks();
        e.stack = e.stack.replace(/[^\n]*at .*test_util.*\n/g, "");
        throw e;
    }
}

export function testWithExpectedDate(chrono: ChronoLike, text: string, expectedDate: Date) {
    testSingleCase(chrono, text, (result) => {
        expect(result.start).toBeDate(expectedDate);
    });
}

export function testUnexpectedResult(chrono: ChronoLike, text: string, refDate?: Date, options?: ParsingOption) {
    const debugHandler = new BufferedDebugHandler();
    options = options || {};
    options.debug = debugHandler;

    try {
        const results = chrono.parse(text, refDate, options);
        expect(results).toHaveLength(0);
    } catch (e) {
        debugHandler.executeBufferedBlocks();
        e.stack = e.stack.replace(/[^\n]*at .*test_util.*\n/g, "");
        throw e;
    }
}

export function measureMilliSec(block: () => void): number {
    const startTime = new Date().getMilliseconds();
    block();
    const endTime = new Date().getMilliseconds();
    return endTime - startTime;
}

// --------------------------------------------------

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        // noinspection JSUnusedGlobalSymbols
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface Matchers<R> {
            toBeDate(date: Date): CustomMatcherResult;
            toBeSingleOnText(text: string): CustomMatcherResult;
        }
    }
}

// noinspection JSUnusedGlobalSymbols
expect.extend({
    toBeDate(resultOrComponent, date) {
        if (typeof resultOrComponent.date !== "function") {
            return {
                message: () => `${resultOrComponent} is not a ParsedResult or ParsedComponent`,
                pass: false,
            };
        }

        const actualDate = resultOrComponent.date();
        const actualTime = actualDate.getTime();
        const expectedTime = date.getTime();
        return {
            message: () => `Expected date to be: ${date} Received: ${actualDate} (${resultOrComponent})`,
            pass: actualTime === expectedTime,
        };
    },

    toBeSingleOnText(results, text) {
        if (results.length === 1) {
            return {
                message: () => `Got single result from '${text}'`,
                pass: true,
            };
        }

        return {
            message: () =>
                `Got ${results.length} results from '${text}'\n${results
                    .map((result) => JSON.stringify(result))
                    .join("\n")}`,
            pass: false,
        };
    },
});
