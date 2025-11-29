import * as chrono from "../../src";

test("Test - Performance test", function () {
    // Make sure there is no issue running on a long text
    const longText =
        "Questo è un testo molto lungo senza date che viene usato per testare le prestazioni. ".repeat(1000) +
        "La data della riunione è il 25 dicembre 2024. " +
        "Un altro testo molto lungo per testare le prestazioni. ".repeat(1000);

    const startTime = Date.now();
    const results = chrono.it.parse(longText);
    const endTime = Date.now();

    expect(results.length).toBe(1);
    expect(results[0].text).toBe("25 dicembre 2024");

    // Should complete in less than 5 seconds
    expect(endTime - startTime).toBeLessThan(5000);
});

test("Test - Performance on many potential matches", function () {
    // Text with many numbers that could be dates
    const textWithNumbers = Array.from({ length: 100 }, (_, i) => `Articolo ${i + 1}: prezzo ${(i + 1) * 100}€`).join(
        ". "
    );

    const startTime = Date.now();
    chrono.it.parse(textWithNumbers);
    const endTime = Date.now();

    // Should complete in less than 1 second
    expect(endTime - startTime).toBeLessThan(1000);
});
