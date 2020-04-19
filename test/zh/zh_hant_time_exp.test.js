import * as chrono from '../../src/chrono';
import { testSingleCase } from '../test_util';

test("Test - Single Expression", function() {


    testSingleCase(chrono, '雞上午6點13分全部都係雞', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('上午6點13分');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(6);
        expect(result.start.get('minute')).toBe(13);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 6, 13))
    });

    testSingleCase(chrono, '雞後天凌晨全部都係雞', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('後天凌晨');

        expect(result.start).toBeDate(new Date(2012, 7, 12, 0, 0))
    });

    testSingleCase(chrono, '雞大前天凌晨全部都係雞', new Date(2012, 7, 10, 0, 0), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('大前天凌晨');

        expect(result.start).toBeDate(new Date(2012, 7, 7, 0, 0))
    });


});

test("Test - Range Expression", function() {

    testSingleCase(chrono, '雞由今朝八點十分至下午11點32分全部都係雞', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('由今朝八點十分至下午11點32分');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(8);
        expect(result.start.get('minute')).toBe(10);

        expect(result.start.isCertain('day')).toBe(true);
        expect(result.start.isCertain('month')).toBe(true);
        expect(result.start.isCertain('year')).toBe(true);
        expect(result.start.isCertain('hour')).toBe(true);
        expect(result.start.isCertain('minute')).toBe(true);
        expect(result.start.isCertain('second')).toBe(false);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 8, 10))

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(32);

        expect(result.end.isCertain('day')).toBe(false);
        expect(result.end.isCertain('month')).toBe(false);
        expect(result.end.isCertain('year')).toBe(false);
        expect(result.end.isCertain('hour')).toBe(true);
        expect(result.end.isCertain('minute')).toBe(true);
        expect(result.end.isCertain('second')).toBe(false);
        expect(result.end.isCertain('millisecond')).toBe(false);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 32));
    });

    testSingleCase(chrono, '6點30pm-11點pm', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('6點30pm-11點pm');

        expect(result.start).not.toBeNull();
        expect(result.start.get('hour')).toBe(18);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('meridiem')).toBe(1);

        expect(result.start).toBeDate(new Date(2012, 7, 10, 18, 30));

        expect(result.end).not.toBeNull();
        expect(result.end.get('hour')).toBe(23);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('meridiem')).toBe(1);

        expect(result.end).toBeDate(new Date(2012, 7, 10, 23, 0));
    });

});

test("Test - Date + Time Expression", function() {

    testSingleCase(chrono, '雞二零一八年十一月廿六日下午三時半五十九秒全部都係雞', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(1);
        expect(result.text).toBe('二零一八年十一月廿六日下午三時半五十九秒');

        expect(result.start.get('year')).toBe(2018);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(26);
        expect(result.start.get('hour')).toBe(15);
        expect(result.start.get('minute')).toBe(30);
        expect(result.start.get('second')).toBe(59);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.isCertain('millisecond')).toBe(false);

        expect(result.start).toBeDate(new Date(2018, 11-1, 26, 15, 30, 59));
    });

});


test("Test - Time Expression's Meridiem imply", function() {

    testSingleCase(chrono, '1點pm到3點', new Date(2012,7,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('1點pm到3點');

        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(8);
        expect(result.start.get('day')).toBe(10);
        expect(result.start.get('hour')).toBe(13);
        expect(result.start.get('minute')).toBe(0);
        expect(result.start.get('second')).toBe(0);
        expect(result.start.get('millisecond')).toBe(0);
        expect(result.start.get('meridiem')).toBe(1);
        expect(result.start.isCertain('meridiem')).toBe(true);

        expect(result.end.get('year')).toBe(2012);
        expect(result.end.get('month')).toBe(8);
        expect(result.end.get('day')).toBe(11);
        expect(result.end.get('hour')).toBe(3);
        expect(result.end.get('minute')).toBe(0);
        expect(result.end.get('second')).toBe(0);
        expect(result.end.get('millisecond')).toBe(0);
        expect(result.end.isCertain('meridiem')).toBe(false)
    });
});


test("Test - Random date + time expression", function() {

    var text = "2014年, 3月5日晏晝 6 點至 7 點";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "下星期六凌晨1點30分廿九秒";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "尋日朝早六點正";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);


    var text = "六月四日3:00am";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "上個禮拜五16時";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "3月17日 20點15";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "10點";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);

    var text = "中午12點";
    var result = chrono.parse(text)[0];
    expect(result.text).toBe(text);
    expect(result.start.get('hour')).toBe(12);
    expect(result.start.get('hour')).toBe(12)
});
