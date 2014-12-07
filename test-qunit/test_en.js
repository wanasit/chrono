

test("Test - Date + Time Expression", function() {

    var text = "Something happen on 2014-04-18 13:00 - 16:00 as";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )
    ok(results[0].text == '2014-04-18 13:00 - 16:00')




});

