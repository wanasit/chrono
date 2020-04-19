import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';


test("Test - Single Expression", function() {

    testSingleCase(chrono, '今日感じたことを忘れずに', new Date(2012, 8-1, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('今日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);

        expect(result.start).toBeDate(new Date(2012, 8-1, 10, 12));
    });


    testSingleCase(chrono, '昨日の全国観測値ランキング', new Date(2012,8-1, 10, 12), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('昨日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 8-1, 9, 12));
    });
});





