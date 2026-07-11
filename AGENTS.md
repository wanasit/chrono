# Agent Documentation - Project Setup & Architecture

This document provides a guide for AI agents working on `chrono` (chrono-node) to quickly understand the project context, layout, testing commands, and implementation constraints.

## Project Overview
`chrono` is a natural language date parser written in JavaScript/TypeScript. It extracts dates, times, and relative date expressions from free text.

---

## Technical Stack & Setup
- **Language**: TypeScript / JavaScript (ES6 Modules and CommonJS outputs)
- **Dependency Manager**: `npm`
- **Testing Framework**: `jest`

### Running Tests
To run the full test suite, execute:
```bash
npm test
```
To run tests silently:
```bash
npm run test:silent
```

---

## Directory Structure & Architecture

```
src/
├── index.ts              # Main entry point and locale shortcut exports
├── chrono.ts             # Main orchestrator class (Chrono, Parser, Refiner, Configuration)
├── results.ts            # Core result models (ParsingResult, ParsingComponents)
├── types.ts              # Global type definitions (ParsedResult, ParsingOption, ParsingReference)
├── calculation/          # Arithmetic helpers (duration, weekdays)
├── common/               # Locale-agnostic base parsers and refiners
├── locales/              # Language-specific configurations, parsers, and refiners
│   ├── de/
│   ├── en/
│   ├── zh/
│   │   ├── hans/
│   │   └── hant/
│   └── ...
└── utils/                # General utility functions
```

### Core Concepts
1. **Parsers (`Parser`)**:
   Implement `innerPattern()` to return the regular expression pattern, and `innerExtract(context, match)` to process matching strings and return a `ParsingResult`.
2. **Refiners (`Refiner`)**:
   Post-process and merge/filter the parsed results (e.g., merging separate date and time components, or resolving overlapping date ranges).
3. **ParsingComponents (`ParsingComponents`)**:
   Stores date and time elements (e.g., year, month, day, hour). Elements are marked as either explicitly assigned (`assign`) or implied (`imply`).

---

## Key Context & Caveats

1. **Modular Parsers**:
   Avoid overloading a single parser with multiple disparate concepts (e.g. mixing "after/within" with "ago/before"). Instead, introduce distinct, small parsers for each concern (e.g., `ZHHansDeadlineFormatParser` and `ZHHansAgoFormatParser`).

2. **Locale Symmetry & Chinese (zh) Special Case**:
   - The Chinese locale is a special case where we want Simplified (`zh.hans`) and Traditional (`zh.hant`) components to remain exactly synchronized. When implementing a parser/refiner or a test for Simplified Chinese (`zh.hans`), always implement the equivalent for Traditional Chinese (`zh.hant`) if relevant, translating characters accordingly (e.g., `几` vs `幾`, `个` vs `個`, `钟` vs `鐘`).
   - English (`en`) is the most advanced locale in the library. Other locales are modeled after English but often lag behind.

3. **Relative Date Arithmetic**:
   Use helpers from `src/calculation/duration.ts` such as `addDuration` and `reverseDuration` to perform date calculations. When handling "ago/before" expressions, calculate the positive duration first, then reverse it using `reverseDuration`.

4. **Abstract Parsers**:
   Inherit from `AbstractParserWithWordBoundaryChecking` (or `AbstractParserWithLeftBoundaryChecking`) to inherit word boundary detection and clean regex boundary matching.

5. **Testing Conventions**:
   - Always pass a clear reference date (`refDate`) to `testSingleCase` to ensure deterministic execution of relative time tests.
   - Assert the matched index (`result.index`) and text boundaries (`result.text`) to check for correct extraction when the text is embedded within sentences.
   - The `result.index` check can be skipped if it is trivial (e.g., the input string is exactly equal to the expected matched text `result.text`).
   - The `result.text` check may also be intentionally omitted on vague edge cases.

---

## Git & Commit Message Format

Follow the Conventional Commits specification:
```
<type>(<scope>): <description>
```
- Example: `feat(zh): support past-tense relative time expressions (e.g. "1小时前")`
- Example: `fix(en): support 'of' connector in weekday postfix`

### Pre-commit Formatting
Run the formatter before staging by executing:
```bash
npm run prettier
```
*Note: Git commit runs `npm run prettier` and `npm run test:silent` automatically as a pre-commit hook.*

---

## AI Agent Tool & Command Guidelines

To ensure secure, auditable, and standard operations:
- **Network Requests**: Do not run arbitrary commands to execute network calls. Use sandboxed tools or curl commands if external documentation is needed.
- **Verification**: Always run `npm test` inside the workspace directory rather than trying to run temporary JS code blocks elsewhere to verify behaviors.
