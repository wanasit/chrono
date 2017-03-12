test("Test - Single Expression", function() {

    var text = "5 days from now, we did something";
    var results = chrono.parse(text, new Date(2012,7,10));
    ok(results.length == 1, JSON.stringify( results ) );

    console.log(results);
});