import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, 'On doit faire quelque chose dans 5 jours.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(28);
        expect(result.text).toBe('dans 5 jours');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });

    testSingleCase(chrono, 'On doit faire quelque chose dans cinq jours.', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(28);
        expect(result.text).toBe('dans cinq jours');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });

    testSingleCase(chrono, 'dans 5 minutes', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('dans 5 minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, 'en 1 heure', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('en 1 heure');

        expect(result.start).toBeDate(new Date(2012,7,10,13,14));
    });

    testSingleCase(chrono, 'Dans 5 minutes je vais rentrer chez moi', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Dans 5 minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, 'Dans 5 secondes une voiture va bouger', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Dans 5 secondes');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });

    testSingleCase(chrono, 'dans deux semaines', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('dans deux semaines');

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12));
    });


    testSingleCase(chrono, 'dans un mois', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('dans un mois');

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12));
    });


    testSingleCase(chrono, 'dans quelques mois', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('dans quelques mois');

        expect(result.start).toBeDate(new Date(2012, 10, 10, 12));
    });


    testSingleCase(chrono, 'en une année', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('en une année');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


    testSingleCase(chrono, 'dans une Année', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('dans une Année');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });

    testSingleCase(chrono, 'Dans 5 Minutes une voiture doit être bougée', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Dans 5 Minutes');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });


    testSingleCase(chrono, 'Dans 5 mins une voiture doit être bougée', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('Dans 5 mins');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });


});


test("Test - Single Expression (Strict)", function() {

    testUnexpectedResult(chrono.strict, 'en une année', new Date(2012,7,10,12,14));


    testUnexpectedResult(chrono.strict, 'en quelques mois', new Date(2012, 8-1, 3))


    testUnexpectedResult(chrono.strict, 'en quelques jours', new Date(2012, 8-1, 3))
});
