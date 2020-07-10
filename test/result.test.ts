import {ParsingComponents} from '../src/results';

test("Test - Create & manipulate date results", () => {

	const refDate = new Date();
	const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24});

	expect(components.get('year')).toBe(2014);
	expect(components.get('month')).toBe(11);
	expect(components.get('day')).toBe(24);
	expect(components.date()).toBeDefined();

	// undefined
	expect(components.get('weekday')).toBeNull();
	expect(components.isCertain('weekday')).toBe(false);

	// "imply"
	components.imply('weekday', 1);
	expect(components.get('weekday')).toBe(1);
	expect(components.isCertain('weekday')).toBe(false);

	// "assign" overrides "imply"
	components.assign('weekday', 2);
	expect(components.get('weekday')).toBe(2);
	expect(components.isCertain('weekday')).toBe(true);

	// "imply" doesn't overrides "assign"
	components.imply('year', 2013);
	expect(components.get('year')).toBe(2014);

	// "assign" overrides "assign"
	components.assign('year', 2013);
	expect(components.get('year')).toBe(2013);
});

test("Test - Calendar Checking", () => {

	const refDate = new Date();

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24});
		expect(components.isValidDate()).toBe(true);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24, hour:12});
		expect(components.isValidDate()).toBe(true);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24, hour:12, minute: 30});
		expect(components.isValidDate()).toBe(true);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24, hour:12, minute: 30, second: 30});
		expect(components.isValidDate()).toBe(true);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 13, day: 24});
		expect(components.isValidDate()).toBe(false);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 32});
		expect(components.isValidDate()).toBe(false);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24, hour:24});
		expect(components.isValidDate()).toBe(false);
	}

	{
		const components = new ParsingComponents(refDate, {year: 2014, month: 11, day: 24, hour:12, minute: 60});
		expect(components.isValidDate()).toBe(false);
	}

	{
		const components = new ParsingComponents(refDate,{year: 2014, month: 11, day: 24, hour:12, minute: 30, second: 60});
		expect(components.isValidDate()).toBe(false);
	}
});
