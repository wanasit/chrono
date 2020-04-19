import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';


test("Test - fr - modifier mandatory just after", function() {

    testUnexpectedResult(chrono.fr, "le mois d'avril");

    testUnexpectedResult(chrono.fr, "le mois d'avril prochain");

});

test("Test - fr - relative date", function() {

    testSingleCase(chrono.fr, 'la semaine prochaine', new Date(2017, 5-1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(21);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'les 2 prochaines semaines', new Date(2017, 5-1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(28);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'les trois prochaines semaines', new Date(2017, 5-1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(15);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(6);
        expect(result.end.get('day')).toBe(4);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'le mois dernier', new Date(2017, 5-1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(4);
        expect(result.end.get('day')).toBe(30);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'les 30 jours précédents', new Date(2017, 5-1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(4);
        expect(result.start.get('day')).toBe(12);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(11);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'les 24 heures passées', new Date(2017, 5-1, 12, 11, 27), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(11);
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(12);
        expect(result.end.get('hour')).toBe(10);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'les 90 secondes suivantes', new Date(2017, 5-1, 12, 11, 27, 0), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(12);
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(27);
        expect(result.start.get('second')).toBe(1);
        expect(result.start.get('millisecond')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(12);
        expect(result.end.get('hour')).toBe(11);
        expect(result.end.get('minute')).toBe(28);
        expect(result.end.get('second')).toBe(30);
        expect(result.end.get('millisecond')).toBe(999);
    });


    testSingleCase(chrono.fr, 'les huit dernieres minutes', new Date(2017, 5-1, 12, 11, 27), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(12);
        expect(result.start.get('hour')).toBe(11);
        expect(result.start.get('minute')).toBe(19);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(5);
        expect(result.end.get('day')).toBe(12);
        expect(result.end.get('hour')).toBe(11);
        expect(result.end.get('minute')).toBe(26);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, 'le dernier trimestre', new Date(2017, 5-1, 12, 11, 27), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2017);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2017);
        expect(result.end.get('month')).toBe(3);
        expect(result.end.get('day')).toBe(31);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });


    testSingleCase(chrono.fr, "l'année prochaine", new Date(2017, 5-1, 12, 11, 27), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2018);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(0);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);

        expect(result.end.get('year')).toBe(2018);
        expect(result.end.get('month')).toBe(12);
        expect(result.end.get('day')).toBe(31);
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(59);
        expect(result.end.get('second')).toBe(59);
    });

});
