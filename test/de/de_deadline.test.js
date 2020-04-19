import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono.de, 'Genau in 5 Tagen müssen wir etwas unternehmen.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(6);
        expect(result.text).toBe('in 5 Tagen');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });



    testSingleCase(chrono.de, 'Wir müssen in fünf Tagen etwas unternehmen.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(11);
        expect(result.text).toBe('in fünf Tagen');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in 5 Minuten', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in 5 Minuten');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, 'In 1 Stunde', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 1 Stunde');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,13,14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.de, 'In 5 Minuten gehe ich nach Hause', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 Minuten');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'In 5 Minuten muss ein Auto umgestellt werden', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 Minuten');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'In 5 Sekunden wird es zu schneien beginnen', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 Sekunden');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 10, 12, 14, 5);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in einer halben Stunde', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in einer halben Stunde');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in zwei Wochen', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in zwei Wochen');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in einem Monat', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in einem Monat');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in einigen Monaten', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in einigen Monaten');

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 10, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'in einem Jahr', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('in einem Jahr');

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.de, 'In Einem jahr', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In Einem jahr');

        var resultDate = result.start.date();
        var expectDate = new Date(2013, 7, 10, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });



    testSingleCase(chrono.de, 'In 5 min kommt der Weihnachstmann', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('In 5 min');

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


});


test("Test - Single Expression (Strict)", function() {

    testUnexpectedResult(chrono.strict, 'in einem Jahr', new Date(2012,7,10,12,14));


    testUnexpectedResult(chrono.strict, 'in einigen Monaten', new Date(2012, 8-1, 3))


    testUnexpectedResult(chrono.strict, 'in einigen Tagen', new Date(2012, 8-1, 3))
});
