
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
            message: () => `Got ${results.length} results from '${text}'`,
            pass: false
        };
    }
});

exports.testSingleCase = (chrono, text, refDate, resultCheck) => {

    if (resultCheck === undefined && typeof refDate === "function") {
        resultCheck = refDate;
        refDate = undefined;
    }

    const results = chrono.parse(text, refDate);
    expect(results).toBeSingleOnText(text);

    resultCheck(results[0]);
}