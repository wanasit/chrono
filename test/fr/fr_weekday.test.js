import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono.fr, "Lundi", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Lundi')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(6)
        expect(result.start.get('weekday')).toBe(1)


        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('weekday')).toBe(true)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 6, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.fr, "Lundi (forward dates only)", new Date(2012,7,9), {forwardDate: true}, (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Lundi')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(13)
        expect(result.start.get('weekday')).toBe(1)


        expect(result.start.isCertain('day')).toBe(false)
        expect(result.start.isCertain('month')).toBe(false)
        expect(result.start.isCertain('year')).toBe(false)
        expect(result.start.isCertain('weekday')).toBe(true)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 13, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.fr, "Jeudi", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Jeudi')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(9)
        expect(result.start.get('weekday')).toBe(4)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 9, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });

    testSingleCase(chrono.fr, "Dimanche", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Dimanche')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(12)
        expect(result.start.get('weekday')).toBe(0)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 12, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.fr, "la deadline était vendredi dernier...", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(18)
        expect(result.text).toBe('vendredi dernier')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2012)
        expect(result.start.get('month')).toBe(8)
        expect(result.start.get('day')).toBe(3)
        expect(result.start.get('weekday')).toBe(5)

        var resultDate = result.start.date();
        var expectDate = new Date(2012, 7, 3, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.fr, "Planifions une réuinion vendredi prochain", new Date(2015, 3, 18), (result) => {
        expect(result.index).toBe(24)
        expect(result.text).toBe('vendredi prochain')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2015)
        expect(result.start.get('month')).toBe(4)
        expect(result.start.get('day')).toBe(24)
        expect(result.start.get('weekday')).toBe(5)

        var resultDate = result.start.date();
        var expectDate = new Date(2015, 3, 24, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });
});


test("Test - Weekday Overlap", function() {

    testSingleCase(chrono.fr, "Dimanche 7 décembre 2014", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Dimanche 7 décembre 2014')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2014)
        expect(result.start.get('month')).toBe(12)
        expect(result.start.get('day')).toBe(7)
        expect(result.start.get('weekday')).toBe(0)


        expect(result.start.isCertain('day')).toBe(true)
        expect(result.start.isCertain('month')).toBe(true)
        expect(result.start.isCertain('year')).toBe(true)
        expect(result.start.isCertain('weekday')).toBe(true)

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12-1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


    testSingleCase(chrono.fr, "Dimanche 7/12/2014", new Date(2012,7,9), (result) => {
        expect(result.index).toBe(0)
        expect(result.text).toBe('Dimanche 7/12/2014')

        expect(result.start).not.toBeNull()
        expect(result.start.get('year')).toBe(2014)
        expect(result.start.get('month')).toBe(12)
        expect(result.start.get('day')).toBe(7)
        expect(result.start.get('weekday')).toBe(0)


        expect(result.start.isCertain('day')).toBe(true)
        expect(result.start.isCertain('month')).toBe(true)
        expect(result.start.isCertain('year')).toBe(true)
        expect(result.start.isCertain('weekday')).toBe(true)

        var resultDate = result.start.date();
        var expectDate = new Date(2014, 12-1, 7, 12);
        expect(expectDate.getTime()).toBeCloseTo(resultDate.getTime())
    });


})



