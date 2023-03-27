import dayjs from "dayjs";
import { TimezoneAbbrMap, Weekday, Month } from "./index";

export const TIMEZONE_ABBR_MAP: TimezoneAbbrMap = {
    ACDT: 630,
    ACST: 570,
    ADT: -180,
    AEDT: 660,
    AEST: 600,
    AFT: 270,
    AKDT: -480,
    AKST: -540,
    ALMT: 360,
    AMST: -180,
    AMT: -240,
    ANAST: 720,
    ANAT: 720,
    AQTT: 300,
    ART: -180,
    AST: -240,
    AWDT: 540,
    AWST: 480,
    AZOST: 0,
    AZOT: -60,
    AZST: 300,
    AZT: 240,
    BNT: 480,
    BOT: -240,
    BRST: -120,
    BRT: -180,
    BST: 60,
    BTT: 360,
    CAST: 480,
    CAT: 120,
    CCT: 390,
    CDT: -300,
    CEST: 120,
    // Note: Many sources define CET as a constant UTC+1. In common usage, however,
    // CET usually refers to the time observed in most of Europe, be it standard time or daylight saving time.
    CET: {
        timezoneOffsetDuringDst: 2 * 60,
        timezoneOffsetNonDst: 60,
        dstStart: (year: number) => getLastWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2),
        dstEnd: (year: number) => getLastWeekdayOfMonth(year, Month.OCTOBER, Weekday.SUNDAY, 3),
    },
    CHADT: 825,
    CHAST: 765,
    CKT: -600,
    CLST: -180,
    CLT: -240,
    COT: -300,
    CST: -360,
    CT: {
        timezoneOffsetDuringDst: -5 * 60,
        timezoneOffsetNonDst: -6 * 60,
        dstStart: (year: number) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
        dstEnd: (year: number) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2),
    },
    CVT: -60,
    CXT: 420,
    ChST: 600,
    DAVT: 420,
    EASST: -300,
    EAST: -360,
    EAT: 180,
    ECT: -300,
    EDT: -240,
    EEST: 180,
    EET: 120,
    EGST: 0,
    EGT: -60,
    EST: -300,
    ET: {
        timezoneOffsetDuringDst: -4 * 60,
        timezoneOffsetNonDst: -5 * 60,
        dstStart: (year: number) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
        dstEnd: (year: number) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2),
    },
    FJST: 780,
    FJT: 720,
    FKST: -180,
    FKT: -240,
    FNT: -120,
    GALT: -360,
    GAMT: -540,
    GET: 240,
    GFT: -180,
    GILT: 720,
    GMT: 0,
    GST: 240,
    GYT: -240,
    HAA: -180,
    HAC: -300,
    HADT: -540,
    HAE: -240,
    HAP: -420,
    HAR: -360,
    HAST: -600,
    HAT: -90,
    HAY: -480,
    HKT: 480,
    HLV: -210,
    HNA: -240,
    HNC: -360,
    HNE: -300,
    HNP: -480,
    HNR: -420,
    HNT: -150,
    HNY: -540,
    HOVT: 420,
    ICT: 420,
    IDT: 180,
    IOT: 360,
    IRDT: 270,
    IRKST: 540,
    IRKT: 540,
    IRST: 210,
    IST: 330,
    JST: 540,
    KGT: 360,
    KRAST: 480,
    KRAT: 480,
    KST: 540,
    KUYT: 240,
    LHDT: 660,
    LHST: 630,
    LINT: 840,
    MAGST: 720,
    MAGT: 720,
    MART: -510,
    MAWT: 300,
    MDT: -360,
    MESZ: 120,
    MEZ: 60,
    MHT: 720,
    MMT: 390,
    MSD: 240,
    MSK: 180,
    MST: -420,
    MT: {
        timezoneOffsetDuringDst: -6 * 60,
        timezoneOffsetNonDst: -7 * 60,
        dstStart: (year: number) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
        dstEnd: (year: number) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2),
    },
    MUT: 240,
    MVT: 300,
    MYT: 480,
    NCT: 660,
    NDT: -90,
    NFT: 690,
    NOVST: 420,
    NOVT: 360,
    NPT: 345,
    NST: -150,
    NUT: -660,
    NZDT: 780,
    NZST: 720,
    OMSST: 420,
    OMST: 420,
    PDT: -420,
    PET: -300,
    PETST: 720,
    PETT: 720,
    PGT: 600,
    PHOT: 780,
    PHT: 480,
    PKT: 300,
    PMDT: -120,
    PMST: -180,
    PONT: 660,
    PST: -480,
    PT: {
        timezoneOffsetDuringDst: -7 * 60,
        timezoneOffsetNonDst: -8 * 60,
        dstStart: (year: number) => getNthWeekdayOfMonth(year, Month.MARCH, Weekday.SUNDAY, 2, 2),
        dstEnd: (year: number) => getNthWeekdayOfMonth(year, Month.NOVEMBER, Weekday.SUNDAY, 1, 2),
    },
    PWT: 540,
    PYST: -180,
    PYT: -240,
    RET: 240,
    SAMT: 240,
    SAST: 120,
    SBT: 660,
    SCT: 240,
    SGT: 480,
    SRT: -180,
    SST: -660,
    TAHT: -600,
    TFT: 300,
    TJT: 300,
    TKT: 780,
    TLT: 540,
    TMT: 300,
    TVT: 720,
    ULAT: 480,
    UTC: 0,
    UYST: -120,
    UYT: -180,
    UZT: 300,
    VET: -210,
    VLAST: 660,
    VLAT: 660,
    VUT: 660,
    WAST: 120,
    WAT: 60,
    WEST: 60,
    WESZ: 60,
    WET: 0,
    WEZ: 0,
    WFT: 720,
    WGST: -120,
    WGT: -180,
    WIB: 420,
    WIT: 540,
    WITA: 480,
    WST: 780,
    WT: 0,
    YAKST: 600,
    YAKT: 600,
    YAPT: 600,
    YEKST: 360,
    YEKT: 360,
};

/**
 * Get the date which is the nth occurence of a given weekday in a given month and year.
 *
 * @param year The year for which to find the date
 * @param month The month in which the date occurs
 * @param weekday The weekday on which the date occurs
 * @param n The nth occurence of the given weekday on the month to return
 * @param hour The hour of day which should be set on the returned date
 * @return The date which is the nth occurence of a given weekday in a given
 *         month and year, at the given hour of day
 */
export function getNthWeekdayOfMonth(year: number, month: Month, weekday: Weekday, n: 1 | 2 | 3 | 4, hour = 0): Date {
    let dayOfMonth = 0;
    let i = 0;
    while (i < n) {
        dayOfMonth++;
        const date = new Date(year, month - 1, dayOfMonth);
        if (date.getDay() === weekday) i++;
    }
    return new Date(year, month - 1, dayOfMonth, hour);
}

/**
 * Get the date which is the last occurence of a given weekday in a given month and year.
 *
 * @param year The year for which to find the date
 * @param month The month in which the date occurs
 * @param weekday The weekday on which the date occurs
 * @param hour The hour of day which should be set on the returned date
 * @return The date which is the last occurence of a given weekday in a given
 *         month and year, at the given hour of day
 */
export function getLastWeekdayOfMonth(year: number, month: Month, weekday: Weekday, hour = 0): Date {
    // Procedure: Find the first weekday of the next month, compare with the given weekday,
    // and use the difference to determine how many days to subtract from the first of the next month.
    const oneIndexedWeekday = weekday === 0 ? 7 : weekday;
    const date = new Date(year, month - 1 + 1, 1, 12);
    const firstWeekdayNextMonth = date.getDay() === 0 ? 7 : date.getDay();
    let dayDiff;
    if (firstWeekdayNextMonth === oneIndexedWeekday) dayDiff = 7;
    else if (firstWeekdayNextMonth < oneIndexedWeekday) dayDiff = 7 + firstWeekdayNextMonth - oneIndexedWeekday;
    else dayDiff = firstWeekdayNextMonth - oneIndexedWeekday;
    date.setDate(date.getDate() - dayDiff);
    return new Date(year, month - 1, date.getDate(), hour);
}

/**
 * Finds and returns timezone offset. If timezoneInput is numeric, it is returned. Otherwise, look for timezone offsets
 * in the following order: timezoneOverrides -> {@link TIMEZONE_ABBR_MAP}.
 *
 * @param timezoneInput Uppercase timezone abbreviation or numeric offset in minutes
 * @param date The date to use to determine whether to return DST offsets for ambiguous timezones
 * @param timezoneOverrides Overrides for timezones
 * @return timezone offset in minutes
 */
export function toTimezoneOffset(
    timezoneInput?: string | number,
    date?: Date,
    timezoneOverrides: TimezoneAbbrMap = {}
): number | null {
    if (timezoneInput == null) {
        return null;
    }

    if (typeof timezoneInput === "number") {
        return timezoneInput;
    }

    const matchedTimezone = timezoneOverrides[timezoneInput] ?? TIMEZONE_ABBR_MAP[timezoneInput];
    if (matchedTimezone == null) {
        return null;
    }
    // This means that we have matched an unambiguous timezone
    if (typeof matchedTimezone == "number") {
        return matchedTimezone;
    }

    // The matched timezone is an ambiguous timezone, where the offset depends on whether the context (refDate)
    // is during daylight savings or not.

    // Without refDate as context, there's no way to know if DST or non-DST offset should be used. Return null instead.
    if (date == null) {
        return null;
    }

    // Return DST offset if the refDate is during daylight savings
    if (
        dayjs(date).isAfter(matchedTimezone.dstStart(date.getFullYear())) &&
        !dayjs(date).isAfter(matchedTimezone.dstEnd(date.getFullYear()))
    ) {
        return matchedTimezone.timezoneOffsetDuringDst;
    }

    // refDate is not during DST => return non-DST offset
    return matchedTimezone.timezoneOffsetNonDst;
}
