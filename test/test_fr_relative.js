// QUnit Setup
//-------------------------------------

var test = function() {
    QUnit.test.apply(QUnit.test, arguments);
}

var ok = function() {
    QUnit.assert.ok.apply(QUnit.assert, arguments);
}

//-------------------------------------
test("Test - FR - modifier mandatory just after", function() {

    var text = "le mois d'avril";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result === undefined, result);

    // The modifier "prochain" have to be just after the word "mois", to avoid this kind of cases we cannot handle
    var text = "le mois d'avril prochain";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result === undefined, result);

});

test("Test - FR - relative date", function() {

    var text = "la semaine prochaine";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 15, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 21, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "les 2 prochaines semaines";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 15, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 28, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "les trois prochaines semaines";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 15, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 6, JSON.stringify(result.end));
    ok(result.end.get('day') == 4, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "le mois dernier";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 4, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 4, JSON.stringify(result.end));
    ok(result.end.get('day') == 30, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "les 30 jours précédents";
    var result = chrono.parse(text, new Date(2017, 5-1, 12))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 4, JSON.stringify(result.start));
    ok(result.start.get('day') == 12, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 11, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "les 24 heures passées";
    var result = chrono.parse(text, new Date(2017, 5-1, 12, 11, 27))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 11, JSON.stringify(result.start));
    ok(result.start.get('hour') == 11, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 12, JSON.stringify(result.end));
    ok(result.end.get('hour') == 10, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "les 90 secondes suivantes";
    var result = chrono.parse(text, new Date(2017, 5-1, 12, 11, 27, 00))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 12, JSON.stringify(result.start));
    ok(result.start.get('hour') == 11, JSON.stringify(result.start));
    ok(result.start.get('minute') == 27, JSON.stringify(result.start));
    ok(result.start.get('second') == 1, JSON.stringify(result.start));
    ok(result.start.get('millisecond') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 12, JSON.stringify(result.end));
    ok(result.end.get('hour') == 11, JSON.stringify(result.end));
    ok(result.end.get('minute') == 28, JSON.stringify(result.end));
    ok(result.end.get('second') == 30, JSON.stringify(result.end));
    ok(result.end.get('millisecond') == 999, JSON.stringify(result.end));


    var text = "les huit dernieres minutes"; // No accent should work too
    var result = chrono.parse(text, new Date(2017, 5-1, 12, 11, 27))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 5, JSON.stringify(result.start));
    ok(result.start.get('day') == 12, JSON.stringify(result.start));
    ok(result.start.get('hour') == 11, JSON.stringify(result.start));
    ok(result.start.get('minute') == 19, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 5, JSON.stringify(result.end));
    ok(result.end.get('day') == 12, JSON.stringify(result.end));
    ok(result.end.get('hour') == 11, JSON.stringify(result.end));
    ok(result.end.get('minute') == 26, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "le dernier trimestre";
    var result = chrono.parse(text, new Date(2017, 5-1, 12, 11, 27))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2017, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2017, JSON.stringify(result.end));
    ok(result.end.get('month') == 3, JSON.stringify(result.end));
    ok(result.end.get('day') == 31, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));


    var text = "l'année prochaine";
    var result = chrono.parse(text, new Date(2017, 5-1, 12, 11, 27))[0];
    ok(result.text == text, result.text);
    ok(result.start.get('year') == 2018, JSON.stringify(result.start));
    ok(result.start.get('month') == 1, JSON.stringify(result.start));
    ok(result.start.get('day') == 1, JSON.stringify(result.start));
    ok(result.start.get('hour') == 0, JSON.stringify(result.start));
    ok(result.start.get('minute') == 0, JSON.stringify(result.start));
    ok(result.start.get('second') == 0, JSON.stringify(result.start));

    ok(result.end.get('year') == 2018, JSON.stringify(result.end));
    ok(result.end.get('month') == 12, JSON.stringify(result.end));
    ok(result.end.get('day') == 31, JSON.stringify(result.end));
    ok(result.end.get('hour') == 23, JSON.stringify(result.end));
    ok(result.end.get('minute') == 59, JSON.stringify(result.end));
    ok(result.end.get('second') == 59, JSON.stringify(result.end));

});
