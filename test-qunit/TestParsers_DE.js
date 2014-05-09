
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


	var text = "Let's finish this before this 30.11.2013.";
	var parser = chrono.parsers.DEAllNumericFormParser(text, new Date(2012,7,8));
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == 2013, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == 10, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == 30, 'Test Result - (Day) ' + JSON.stringify(result.start) )

		ok(result.text   == '30.11.2013', 'Test Result - (Text) ' + JSON.stringify(result.text) )

		var resultDate = (result.startDate);
		var expectDate = (new Date(2013,10,30,12));
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


test("Test - Weekday parsing", function() {
	var refDate = new Date(2014, 0, 3);

	testWeekDayParsing("Der Termin ist diesen Montag.", refDate, 2013, 11, 30);
	testWeekDayParsing("Der Termin ist nächsten Montag.", refDate, 2014, 0, 6);
	testWeekDayParsing("Das wäre der nächste Montag.",	refDate, 2014, 0, 6);
	testWeekDayParsing("Der Termin war letzten Montag.", refDate, 2013, 11, 23);

	testWeekDayParsing("Der Termin ist diesen Donnerstag.", refDate, 2014, 0, 2);
	testWeekDayParsing("Der Termin ist nächsten Donnerstag.", refDate, 2014, 0, 9);
	testWeekDayParsing("Das wäre der nächste Donnerstag.",	refDate, 2014, 0, 9);
	testWeekDayParsing("Der Termin war letzten Donnerstag.", refDate, 2013, 11, 26);

	testWeekDayParsing("Der Termin ist diesen Freitag.", refDate, 2014, 0, 3);
	testWeekDayParsing("Der Termin ist nächsten Freitag.", refDate, 2014, 0, 10);
	testWeekDayParsing("Das wäre der nächste Freitag.",	refDate, 2014, 0, 10);
	testWeekDayParsing("Der Termin war letzten Freitag.", refDate, 2013, 11, 27);
});

var testWeekDayParsing = function(stringToBeParsed, referenceDate, expectedYear, expectedMonth, expectedDate) {
	var parser = chrono.parsers.DEDayOfWeekParser(stringToBeParsed, referenceDate);
	ok(parser, parser)

	parser.execAll();
	ok(parser.results().length == 1, JSON.stringify( parser.results() ) )

	var result = parser.results()[0];
	if(result){
		ok(result.start, JSON.stringify(result.start) )
		ok(result.start.year  == expectedYear, 'Test Result - (Year) ' + JSON.stringify(result.start) )
		ok(result.start.month == expectedMonth, 'Test Result - (Month) ' + JSON.stringify(result.start) )
		ok(result.start.day   == expectedDate, 'Test Result - (Day) ' + JSON.stringify(result.start) )
	}
}
