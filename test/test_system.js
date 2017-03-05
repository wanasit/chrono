
test("Test - Module status", function() {

	ok(chrono, 	'Load: chrono');

	ok(chrono.Chrono, 'Load: chrono.Chrono');

	ok(chrono.Parser, 'Load: chrono.Parser');

	ok(chrono.Refiner, 'Load: chrono.Refiner');

	ok(chrono.ParsedResult, 'Load: chrono.ParsedResult');

	ok(chrono.ParsedComponents, 'Load: chrono.ParsedComponents');

	ok(chrono.parse, 'Check function [parse]');

	ok(chrono.parseDate, 'Check function [parseDate]');

	ok(chrono.options, 'Check [options] object');

	ok(chrono.casual, 'Check [chrono.casual] object');

	ok(chrono.strict, 'Check [chrono.strict] object');
});


test("Test - Create & manipulate date results", function() {

	var components = new chrono.ParsedComponents( {year: 2014, month: 11, day: 24});
	ok(components.get('year') == 2014);
	ok(components.get('month') == 11);
	ok(components.get('day') == 24);
	ok(components.date());

	// undefined
	ok(components.get('dayOfWeek') === undefined);
	ok(!components.isCertain('dayOfWeek'));

	// "imply"
	components.imply('dayOfWeek', 1);
	ok(components.get('dayOfWeek') == 1);
	ok(!components.isCertain('dayOfWeek'));
	
	// "assign" overrides "imply"
	components.assign('dayOfWeek', 2);
	ok(components.get('dayOfWeek') == 2);
	ok(components.isCertain('dayOfWeek'));

	// "imply" doesn't overrides "assign"
	components.imply('year', 2013);
	ok(components.get('year') == 2014);

	// "assign" overrides "assign"
	components.assign('year', 2013)
	ok(components.get('year') == 2013);
});

test("Test - Calendar Checking", function() {

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24});
	ok(components.isPossibleDate() == true);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:12});
	ok(components.isPossibleDate() == true);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:12, minute: 30});
	ok(components.isPossibleDate() == true);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:12, minute: 30, second: 30});
	ok(components.isPossibleDate() == true);

	var components = new chrono.ParsedComponents({year: 2014, month: 13, day: 24});
	ok(components.isPossibleDate() == false);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 32});
	ok(components.isPossibleDate() == false);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:24});
	ok(components.isPossibleDate() == false);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:12, minute: 60});
	ok(components.isPossibleDate() == false);

	var components = new chrono.ParsedComponents({year: 2014, month: 11, day: 24, hour:12, minute: 30, second: 60});
	ok(components.isPossibleDate() == false);
});

test("Test - Override parser", function() {

	var originalText = '01234-pattern-01234-pattern';
	var originalOpt = { some: 'thing'};
	var extractCalled = 0;

	function CustomParser() {
		chrono.Parser.apply(this, arguments);

		this.pattern = function () { return /pattern/; }
		this.extract = function(text, ref, match, opt){

			if(extractCalled == 0){
				ok(text == originalText, 'matched text: ' + text);
				ok(opt == originalOpt, 'matched opt: ' + opt);
				ok(match.index == 6, 'matched index: ' + match.index);
			} else if(extractCalled == 1){
				ok(text == originalText, 'matched text: ' + text);
				ok(opt == originalOpt, 'matched opt: ' + opt);
				ok(match.index == 20, 'matched index: ' + match.index);
			}

			extractCalled += 1;
			return null;
		}
	}

	var customParser = new CustomParser();
	var results = customParser.execute(originalText, new Date(), originalOpt);
	ok(extractCalled == 2, 'Function [extract] called: ' + extractCalled);
});


test("Test - combining options", function() {

	var firstOption = {
		parsers: [
			new chrono.parser.ENISOFormatParser(),
		],
		refiners: [
			new chrono.refiner.OverlapRemovalRefiner(),
		]
	}

	var secondOption = {
		parsers: [
			new chrono.parser.ENISOFormatParser(),
			new chrono.parser.JPStandardParser(),
		],
		refiners: []
	}

	var mergedOption = chrono.options.mergeOptions([
		firstOption,
		secondOption
	]);

	ok(mergedOption);
	ok(mergedOption.parsers.length == 2);
	ok(mergedOption.refiners.length == 1);

	var customChrono = new chrono.Chrono(mergedOption);
	ok(customChrono.parseDate('2012-9-3'));
	ok(customChrono.parseDate('2012年９月3日'));
	ok(!customChrono.parseDate('Tuesday'));
});

test("Test - language options", function() {
	ok(chrono.ja.parseDate('2012-9-3'));
	ok(chrono.ja.parseDate('2012年９月3日'));
	ok(!chrono.ja.parseDate('Lundi'));

	ok(chrono.fr.parseDate('2012-9-3'));
	ok(chrono.fr.parseDate('Lundi'));
	ok(!chrono.fr.parseDate('2012年９月3日'));
});


