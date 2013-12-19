
test("Test - Timezone Conversion", function() {

	var results = chrono.parse(
		'Today at 4.30 PM',
		'Thu Dec 19 2013 12:00:00 GMT-0500 (EST)'
	);

	ok(results.length == 1, JSON.stringify( results ) )

	var result = results[0];
	ok(result.start.year 	== 2013, 'year  in ' + JSON.stringify( result.start ) )
	ok(result.start.month 	== 11, 	'month in ' +JSON.stringify( result.start ) )
	ok(result.start.day 	== 19, 	'day  in ' +JSON.stringify( result.start ) )
	ok(result.start.hour 	== 16, 	'hour in ' +JSON.stringify( result.start ) )
	ok(result.start.minute 	== 30, 	'year in ' +JSON.stringify( result.start ) )

	var resultDate = result.start.date();
	var expectDate = new Date('Thu Dec 19 2013 16:30:00 GMT-0500 (EST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 10, 'date - ' + resultDate +'/' +expectDate)

	var resultDate = result.start.date(-9*60);
	var expectDate = new Date('Thu Dec 19 2013 16:30:00 GMT+0900 (JST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 10, 'date - ' + resultDate +'/' +expectDate)


	var results = chrono.parse(
		'Today at 4.30 PM',
		new Date('Thu Dec 19 2013 12:00:00 GMT-0500 (EST)'),
		{ timezoneOffset: 5*60 }
	);

	ok(results.length == 1, JSON.stringify( results ) )
	
	var result = results[0];
	ok(result.start.year == 2013, 	'year  in ' + JSON.stringify( result.start ) )
	ok(result.start.month == 11, 	'month in ' +JSON.stringify( result.start ) )
	ok(result.start.day == 19, 		'day  in ' +JSON.stringify( result.start ) )
	ok(result.start.hour == 16, 	'hour in ' +JSON.stringify( result.start ) )
	ok(result.start.minute == 30, 	'year in ' +JSON.stringify( result.start ) )

	var resultDate = result.start.date();
	var expectDate = new Date('Thu Dec 19 2013 16:30:00 GMT-0500 (EST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 10, 'date - ' + resultDate +'/' +expectDate)

	var resultDate = result.start.date(-9*60);
	var expectDate = new Date('Thu Dec 19 2013 16:30:00 GMT+0900 (JST)');
	ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 10, 'date - ' + resultDate +'/' +expectDate)
});


