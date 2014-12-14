

test("Test - Date + Time Expression", function() {

    var text = "Something happen on 2014-04-18 13:00 - 16:00 as";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) )
    ok(results[0].text == '2014-04-18 13:00 - 16:00')



    
});


test("Test - Compare with native js", function() {

    var text = 'Sat Nov 05 1994 22:45:30 GMT+0900 (JST)';
    var result = chrono.parse(text)[0];
    var expect = new Date(text);

    ok(result.text == text, result.text);
    ok(Math.abs(expect.getTime() - result.start.date().getTime()) <= 1000)

});
