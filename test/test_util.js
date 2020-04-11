

export function testSingleCase(chrono, text, refDateOrResultCheck, optionOrResultCheck, resultCheck) {

    if (resultCheck === undefined && typeof optionOrResultCheck === "function") {
        resultCheck = optionOrResultCheck;
        optionOrResultCheck = undefined;
    }

    if (optionOrResultCheck === undefined && typeof refDateOrResultCheck === "function") {
        resultCheck = refDateOrResultCheck;
        refDateOrResultCheck = undefined;
    }

    const results = chrono.parse(text, refDateOrResultCheck, optionOrResultCheck);
    expect(results).toBeSingleOnText(text);

    resultCheck(results[0]);
}

export function testWithExpectedDate(chrono, text, expectedDate) {

    testSingleCase(chrono, text, (result) => {

        expect(result.start).toBeDate(expectedDate);
    });
}

export function testUnexpectedResult(chrono, text, refDate) {
    const results = chrono.parse(text, refDate);
    expect(results).toHaveLength(0);
}

expect.extend({

    toBeDate(resultOrComponent, date) {
        if (typeof resultOrComponent.date !== 'function') {
            return {
                message: () => `${resultOrComponent} is not a ParsedResult or ParsedComponent`,
                pass: false
            };
        }

        const actualDate = resultOrComponent.date();
        const actualTime = actualDate.getTime();
        const expectedTime = date.getTime();
        return {
            message: () => `Expected date to be: ${date} Received: ${actualDate}`,
            pass: actualTime === expectedTime
        };
    },

    toBeSingleOnText(results, text) {
        if (results.length === 1) {
            return {
                message: () => `Got single result from '${text}'`,
                pass: true
            };
        }

        return {
            message: () => `Got ${results.length} results from '${text}'\n${
                results.map(
                    result => JSON.stringify(result)
                ).join('\n')
            }`,
            pass: false
        };
    }
});