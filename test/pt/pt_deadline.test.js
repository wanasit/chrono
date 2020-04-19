import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, 'nós temos que fazer algo em 5 dias.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(25)
        expect(result.text).toBe('em 5 dias')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(15)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 15, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'nós temos que fazer algo dentro de 10 dias', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(25)
        expect(result.text).toBe('dentro de 10 dias')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(20)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 8-1, 20, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono, 'em 5 minutos', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('em 5 minutos')

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,19);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'em uma hora', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('em uma hora')

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,13,14);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono, 'em meia hora', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('em meia hora')

        var resultDate = result.start.date();
        var expectDate = new Date(2012,7,10,12,44);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});
