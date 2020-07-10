import * as chrono from '../../src/';
import { testSingleCase } from '../test_util';


test("Test - Single Expression", function() {

    testSingleCase(chrono.ja, '主な株主（2012年3月31日現在）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('2012年3月31日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(3);
        expect(result.start.get('day')).toBe(31);

        expect(result.start).toBeDate(new Date(2012, 3-1, 31, 12));
    });


    testSingleCase(chrono.ja, '主な株主（2012年９月3日現在）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('2012年９月3日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 9-1, 3, 12));
    });

    testSingleCase(chrono.ja, '主な株主（2020年2月29日現在）', new Date(2019,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('2020年2月29日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2020);
        expect(result.start.get('month')).toBe(2);
        expect(result.start.get('day')).toBe(29);

        expect(result.start).toBeDate(new Date(2020, 2-1, 29, 12));
    });

    testSingleCase(chrono.ja, '主な株主（９月3日現在）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('９月3日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(9);
        expect(result.start.get('day')).toBe(3);

        expect(result.start).toBeDate(new Date(2012, 9-1, 3, 12));
    });

    testSingleCase(chrono.ja, '主な株主（平成26年12月29日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('平成26年12月29日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2014);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(29);

        expect(result.start).toBeDate(new Date(2014, 12-1, 29, 12));
    });

    testSingleCase(chrono.ja, '主な株主（昭和６４年１月７日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('昭和６４年１月７日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(1989);
        expect(result.start.get('month')).toBe(1);
        expect(result.start.get('day')).toBe(7);

        expect(result.start).toBeDate(new Date(1989, 1-1, 7, 12));
    });


    testSingleCase(chrono.ja, '主な株主（令和元年5月1日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('令和元年5月1日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2019);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(1);

        expect(result.start).toBeDate(new Date(2019, 5-1, 1, 12));
    });

    testSingleCase(chrono.ja, '主な株主（令和2年5月1日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('令和2年5月1日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2020);
        expect(result.start.get('month')).toBe(5);
        expect(result.start.get('day')).toBe(1);

        expect(result.start.isCertain('year')).toBeTruthy();

        expect(result.start).toBeDate(new Date(2020, 5-1, 1, 12));
    });

    testSingleCase(chrono.ja, '主な株主（同年7月27日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('同年7月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });

    testSingleCase(chrono.ja, '主な株主（本年7月27日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('本年7月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });

    testSingleCase(chrono.ja, '主な株主（今年7月27日）', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('今年7月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });

    testSingleCase(chrono.ja, '主な株主（今年11月27日）', new Date(2012,1-1,10), (result) => {
        expect(result.index).toBe(5);
        expect(result.text).toBe('今年11月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2012, 11-1, 27, 12));
    });
});


test("Test - Single Expression without year", function() {

    testSingleCase(chrono.ja, '7月27日', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('7月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2012);
        expect(result.start.get('month')).toBe(7);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2012, 7-1, 27, 12));
    });

    testSingleCase(chrono.ja, '11月27日', new Date(2012,1-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('11月27日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2011);
        expect(result.start.get('month')).toBe(11);
        expect(result.start.get('day')).toBe(27);

        expect(result.start).toBeDate(new Date(2011, 11-1, 27, 12));
    });
});


test("Test - Range Expression", function() {

    testSingleCase(chrono.ja, '2013年12月26日-2014年1月7日', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('2013年12月26日-2014年1月7日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(26);

        expect(result.start).toBeDate(new Date(2013, 12-1, 26, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2014);
        expect(result.end.get('month')).toBe(1);
        expect(result.end.get('day')).toBe(7);

        expect(result.end).toBeDate(new Date(2014, 1-1, 7, 12));
    });

    testSingleCase(chrono.ja, '２０１３年１２月２６日ー2014年1月7日', new Date(2012,8-1,10), (result) => {
        expect(result.index).toBe(0);
        expect(result.text).toBe('２０１３年１２月２６日ー2014年1月7日');

        expect(result.start).not.toBeNull();
        expect(result.start.get('year')).toBe(2013);
        expect(result.start.get('month')).toBe(12);
        expect(result.start.get('day')).toBe(26);

        expect(result.start).toBeDate(new Date(2013, 12-1, 26, 12));

        expect(result.end).not.toBeNull();
        expect(result.end.get('year')).toBe(2014);
        expect(result.end.get('month')).toBe(1);
        expect(result.end.get('day')).toBe(7);

        expect(result.end).toBeDate(new Date(2014, 1-1, 7, 12));
    });


});





