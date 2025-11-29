import * as chrono from "../../src";
import { testUnexpectedResult } from "../test_util";

test("Test - Negative cases - Should not parse", function () {
    // Random text without dates
    testUnexpectedResult(chrono.it, "Questo è solo testo senza date");

    testUnexpectedResult(chrono.it, "Ciao come stai");

    testUnexpectedResult(chrono.it, "Il prezzo è 1000 euro");

    testUnexpectedResult(chrono.it, "Articolo numero 12345");

    // Invalid dates - Note: some invalid dates may partially match valid patterns
    testUnexpectedResult(chrono.it, "30 febbraio 2020");

    testUnexpectedResult(chrono.it, "0 marzo 2020");
});

test("Test - Negative cases - Numbers that look like dates", function () {
    // Phone numbers
    testUnexpectedResult(chrono.it, "Chiamami al 123456789");

    // Prices
    testUnexpectedResult(chrono.it, "Costa 1000");

    // Version numbers
    testUnexpectedResult(chrono.it, "Versione 2.0.1");
});
