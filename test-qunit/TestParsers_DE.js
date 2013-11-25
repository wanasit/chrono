
test("Test - All-numeric form parser", function() {
	
	var text = "Let's finish this before this 2.7.2012.";
	var parser = chrono.parsers.DEAllNumericFormParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 6, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 2, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		ok(result.text   == '2.7.2012', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,6,2,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	


	var text = "Let's finish this before this 12.1.2012.";
	var parser = chrono.parsers.DEAllNumericFormParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		ok(result.text   == '12.1.2012', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,0,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}


	var text = "Let's finish this before this 07.01.03.";
	var parser = chrono.parsers.DEAllNumericFormParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2003, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 0, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 7, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		ok(result.text   == '07.01.03', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2003,0,7,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});



test("Test - Month name little endian parser", function() {
	
	var text = "Die Antwort kam am Freitag, den 12. August 2011";
	var parser = chrono.parsers.DEMonthNameLittleEndianParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2011, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 7,  'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 12, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		ok(result.text   == 'Freitag, den 12. August 2011', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2011,7,12,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	

	var text = "Die Antwort kam am Freitag, den 20. Mai.";
	var parser = chrono.parsers.DEMonthNameLittleEndianParser(text, new Date(2012,7,8));
	ok(parser, parser)
	
	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2012, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 4,  'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 20, 'Test Result - (Day) ' + JSON.stringify(result.start) )
		
		ok(result.text   == 'Freitag, den 20. Mai', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2012,4,20,12));
		ok(Math.abs(expectDate.getTime() - resultDate.getTime()) < 100000, 'Test result.startDate ' + resultDate +'/' +expectDate)
	}
	
});

