import * as chrono from '../../src/chrono';
import { testSingleCase, testUnexpectedResult } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.fr, "La deadline est maintenant", new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('maintenant');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(9);
        expect(result.start.get('second')).toBe(10);
        expect(result.start.get('millisecond')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 9, 10, 11));
    });


    testSingleCase(chrono.fr, "La deadline est aujourd'hui", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('aujourd\'hui');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.fr, "La deadline est demain", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('demain');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    // Say.."Demain" in the late night (1 AM)
    testSingleCase(chrono.fr, "La deadline est demain", new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.fr, "La deadline était hier", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(18);
        expect(result.text).toBe('hier');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });


    testSingleCase(chrono.fr, "La deadline était la veille", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(18);
        expect(result.text).toBe('la veille');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('hour')).toBe(0);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 0));
    });


    testSingleCase(chrono.fr, "La deadline est ce matin", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('ce matin');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(8);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8));
    });


    testSingleCase(chrono.fr, "La deadline est cet après-midi", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('cet après-midi');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14));
    });

    testSingleCase(chrono.fr, "La deadline est cet aprem", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('cet aprem');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(14);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 14));
    });


    testSingleCase(chrono.fr, "La deadline est ce soir", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('ce soir');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(18);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18));
    });
});


test("Test - Combined Expression", function() {


    testSingleCase(chrono.fr, "La deadline est aujourd'hui 17:00", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('aujourd\'hui 17:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });

    testSingleCase(chrono.fr, "La deadline est demain 17:00", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('demain 17:00');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 17));
    });

    testSingleCase(chrono.fr, "La deadline est demain matin 11h", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(16);
        expect(result.text).toBe('demain matin 11h');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);
        expect(result.start.get('hour')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 11));
    });
});


test("Test - Casual date range", function() {

    testSingleCase(chrono.fr, "L'évenènement est d'aujourd'hui à vendredi prochain", new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe("aujourd'hui à vendredi prochain");

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(4);
        expect(result.start.get('hour')).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 4, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(10);
        expect(result.end.get('hour')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 12));
    });



    testSingleCase(chrono.fr, "L'évenènement est d'aujourd'hui à vendredi prochain", new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(20);
        expect(result.text).toBe('aujourd\'hui à vendredi prochain');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(12);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));


        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(17);
        expect(result.end.get('hour')).toBe(12);

        expect(result.end).toBeDate(new Date(2012, 7, 17, 12));
    });
});





test('Test - Random text', function() {

    var text = "cette nuit";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('year')).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')).toBe(1);
    expect(result.start.get('hour')).toBe(22);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 8pm";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 20h";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 20:00";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 20h00";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 20h00m00";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "ce soir 20h00m00s";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "Ce soir à 20h";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);

    var text = "Ce soir a 20h";
    var result = chrono.fr.parse(text, new Date(2012, 1-1, 1, 12))[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour') ).toBe(20);
    expect(result.start.get('year') ).toBe(2012);
    expect(result.start.get('month')).toBe(1);
    expect(result.start.get('day')  ).toBe(1);
    expect(result.start.get('meridiem') ).toBe(1);


    var text = "jeu";
    var result = chrono.fr.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(4);


    var text = "sam";
    var result = chrono.fr.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('weekday')).toBe(6)
});


test('Test - Random negative text', function() {

    testUnexpectedResult(chrono.fr, "pasaujourd'hui");

    testUnexpectedResult(chrono.fr, 'pashier');

    testUnexpectedResult(chrono.fr, 'maintenanter');

});
