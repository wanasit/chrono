test('Test - Random text', function() { 

    var text = "...Donnerstag, 15. Dezember 2011 Best Available Rate "
    var results = chrono.parse(text);
    ok(results.length >= 1, JSON.stringify(results) )
    ok(results[0].start.get('day') == 15, JSON.stringify(results) )
    ok(results[0].start.get('month') == 12, JSON.stringify(results) )
    ok(results[0].start.get('year') == 2011, JSON.stringify(results) )


    var text = "9:00 bis 17:00, Dienstag, 20. Mai 2013"
    var results = chrono.parse(text);
    ok(results.length == 1, JSON.stringify(results) )
    ok(results[0].start.get('hour') == 9, JSON.stringify(results) )
    ok(results[0].end.get('hour') == 17, JSON.stringify(results) )
    ok(results[0].end.get('meridiem') == 1, JSON.stringify(results))
    ok(results[0].end.get('day') == 20, JSON.stringify(results))
    ok(results[0].end.get('month') == 5, JSON.stringify(results))
    ok(results[0].end.get('year') == 2013, JSON.stringify(results))
});
