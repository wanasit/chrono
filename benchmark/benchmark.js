const chrono = require("..");
const b = require("benny");

b.suite(
    "Basic parsing benchmark",

    b.add("Parsing empty string", () => {
        chrono.parse("");
    }),

    b.add("Parsing slash date - 11/12/2021", () => {
        chrono.en.parseDate("11/12/2021");
    }),

    b.add("Parsing a long repeated space", () => {
        chrono.parse(`second ${" ".repeat(1000)} fourth ${" ".repeat(1000)} jum`);
    }),

    b.cycle(),
    b.complete(),
    b.save({ file: "chrono", format: "chart.html" })
);
