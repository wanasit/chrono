import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono.casual, '雞而家全部都係雞', new Date(2012, 7, 10, 8, 9, 10, 11), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('而家');

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


    testSingleCase(chrono.casual, '雞今日全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });


    testSingleCase(chrono.casual, '雞聽日全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('聽日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(11);

        expect(result.start).toBeDate(new Date(2012, 7, 11, 12));
    });

    // Say.."Tomorrow" in the late night (1 AM)
    testSingleCase(chrono.casual, '雞明天全部都係雞', new Date(2012, 7, 10, 1), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 10, 12));
    });

    testSingleCase(chrono.casual, '雞後天凌晨全部都係雞', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 12, 0, 0));
    });

    testSingleCase(chrono.casual, '雞大前天凌晨全部都係雞', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.start).toBeDate(new Date(2012, 7, 7, 0, 0));
    });


    testSingleCase(chrono.casual, '雞琴日全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('琴日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 12));
    });


    testSingleCase(chrono.casual, '雞昨天晚上全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('昨天晚上');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);
        expect(result.start.get('hour')).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 9, 22));
    });


    testSingleCase(chrono.casual, '雞今日朝早全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今日朝早');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(6);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6));
    });


    testSingleCase(chrono.casual, '雞晏晝全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('晏晝');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 15));
    });


    testSingleCase(chrono.casual, '雞今晚全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今晚');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(22);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 22));
    });
});


test("Test - Combined Expression", function() {


    testSingleCase(chrono.casual, '雞今日晏晝5點全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今日晏晝5點');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(17);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 17));
    });
});


test("Test - Casual date range", function() {

    testSingleCase(chrono.casual, '雞今日 - 下禮拜五全部都係雞', new Date(2012, 7, 4, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今日 - 下禮拜五');

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



    testSingleCase(chrono.casual, '雞今日 - 下禮拜五全部都係雞', new Date(2012, 7, 10, 12), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('今日 - 下禮拜五');

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

    testSingleCase(chrono, '今日夜晚', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(1);
        expect(result.start.get('hour')).toBe(22);
        expect(result.start.get('meridiem') ).toBe(1);
    });

    testSingleCase(chrono, '今晚8點正', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, '晚上8點', new Date(2012, 1-1, 1, 12), (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('hour') ).toBe(20);
        expect(result.start.get('year') ).toBe(2012);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')  ).toBe(1);
        expect(result.start.get('meridiem') ).toBe(1);
    });


    testSingleCase(chrono, '星期四', (result, text) => {

        expect(result.text).toBe(text);
        expect(result.start.get('weekday')).toBe(4);
    });
});
