import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {

    testSingleCase(chrono, '五日內我地有d野做', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('五日內');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });



    testSingleCase(chrono, '5日之內我地有d野做', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5日之內');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(15);

        expect(result.start).toBeDate(new Date(2012, 8-1, 15, 12));
    });


    testSingleCase(chrono, '十日內我地有d野做', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('十日內');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(20);

        expect(result.start).toBeDate(new Date(2012, 8-1, 20, 12));
    });


    testSingleCase(chrono, '五分鐘後', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('五分鐘後');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, '一個鐘之內', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('一個鐘之內');

        expect(result.start).toBeDate(new Date(2012,7,10,13,14));
    });

    testSingleCase(chrono, '5分鐘之後我就收皮', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('5分鐘之後');

        expect(result.start).toBeDate(new Date(2012,7,10,12,19));
    });

    testSingleCase(chrono, '係5秒之後你就會收皮', new Date(2012,7, 10, 12, 14), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('5秒之後');

        expect(result.start).toBeDate(new Date(2012, 7, 10, 12, 14, 5));
    });


    testSingleCase(chrono, '半小時之內', new Date(2012,7,10,12,14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('半小時之內');

        expect(result.start).toBeDate(new Date(2012,7,10,12,44));
    });


    testSingleCase(chrono, '兩個禮拜內答覆我', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('兩個禮拜內');

        expect(result.start).toBeDate(new Date(2012, 7, 24, 12));
    });


    testSingleCase(chrono, '1個月之內答覆我', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1個月之內');

        expect(result.start).toBeDate(new Date(2012, 8, 10, 12));
    });


    testSingleCase(chrono, '幾個月之內答覆我', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('幾個月之內');

        expect(result.start).toBeDate(new Date(2012, 10, 10, 12));
    });


    testSingleCase(chrono, '一年內答覆我', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('一年內');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


    testSingleCase(chrono, '1年之內答覆我', new Date(2012, 7, 10, 12, 14), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1年之內');

        expect(result.start).toBeDate(new Date(2013, 7, 10, 12));
    });


});
