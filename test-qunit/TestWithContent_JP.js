test("Test - Email 1", function() {
	
	var text = "　日　時：2012年11月1日（木）　15：00〜16：30\n　場　所：本郷キャンパス　工学部2号館213講義室";

	var results = chrono.parse(text, new Date(2012,7,10));
	
	ok(results.length == 1, text )
	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	if(result){
		ok(result.start.year == 2012 && 
		  result.start.month == 10 &&
		  result.start.day   == 1 &&
		  result.start.hour   == 15  && 
		  result.start.minute   == 00, 
		JSON.stringify(result.start))
		
		ok(result.end.year == 2012 && 
		  result.end.month == 10 &&
		  result.end.day   == 1 &&
		  result.end.hour   == 16  && 
		  result.end.minute   == 30, 
		JSON.stringify(result.end))
	}
});