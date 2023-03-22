import dayjs from "dayjs";

export type TimezoneAbbrMap = { [key: string]: number };

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
    CHADT: 825,
    CHAST: 765,
    CKT: -600,
    CLST: -180,
    CLT: -240,
    COT: -300,
    CST: -360,
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

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Get transition date and time for timezones that transitions on the nth [weekday] of the month.
 *
 * @param year The year for which to find the transition date
 * @param month The month in which the transition date occurs; 0 for January
 * @param day The weekday on which the transition date occurs; 0 for Sunday
 * @param n The nth occurence of the given weekday on the month to return
 * @param hour The hour on which the transition occurs
 * @return The date and time on which the transition from/to DST occurs
 */
export function getNthDayOfMonthTransition(
    year: number,
    month: number,
    day: Weekday,
    n: 1 | 2 | 3 | 4,
    hour: number
): Date {
    let dateOfMonth = 0;
    let i = 0;
    while (i < n) {
        dateOfMonth++;
        const date = new Date(year, month, dateOfMonth);
        if (date.getDay() === day) i++;
    }
    return new Date(year, month, dateOfMonth, hour);
}

/**
 * Get transition date and time for timezones that transitions on the last [weekday] of the month.
 *
 * @param year The year for which to find the transition date
 * @param month The month in which the transition date occurs; 0 for January
 * @param day The weekday on which the transition date occurs; 0 for Sunday
 * @param hour The hour on which the transition occurs
 * @return The date and time on which the transition from/to DST occurs
 */
export function getLastDayOfMonthTransition(year: number, month: number, day: number, hour: number): Date {
    const oneIndexedDay = day === 0 ? 7 : day;
    const date = new Date(year, month + 1, 1, 12);
    const firstDayNextMonth = date.getDay() === 0 ? 7 : date.getDay();
    let dayDiff;
    if (firstDayNextMonth === oneIndexedDay) dayDiff = 7;
    else if (firstDayNextMonth < oneIndexedDay) dayDiff = 7 + firstDayNextMonth - oneIndexedDay;
    else dayDiff = firstDayNextMonth - oneIndexedDay;
    date.setDate(date.getDate() - dayDiff);
    return new Date(year, month, date.getDate(), hour);
}

export type AmbiguousTimezoneMap = {
    [key: string]: {
        dst: number; // timezone offset during DST
        nonDst: number; // timzone offset during non-DST
        dstStart: (d: Date) => Date; // Return the start date of DST for the given year
        dstEnd: (d: Date) => Date; // Return the end date of DST for the given year
    };
};

export const AMBIGUOUS_TIMEZONE_ABBR: AmbiguousTimezoneMap = {
    CT: {
        dst: -5 * 60,
        nonDst: -6 * 60,
        dstStart: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 2, 0, 2, 2),
        dstEnd: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 10, 0, 1, 2),
    },
    ET: {
        dst: -4 * 60,
        nonDst: -5 * 60,
        dstStart: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 2, 0, 2, 2),
        dstEnd: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 10, 0, 1, 2),
    },
    PT: {
        dst: -7 * 60,
        nonDst: -8 * 60,
        dstStart: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 2, 0, 2, 2),
        dstEnd: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 10, 0, 1, 2),
    },
    MT: {
        dst: -6 * 60,
        nonDst: -7 * 60,
        dstStart: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 2, 0, 2, 2),
        dstEnd: (d: Date) => getNthDayOfMonthTransition(d.getFullYear(), 10, 0, 1, 2),
    },
    // Note: Many sources define CET as a constant UTC+1. In common usage, however,
    // CET usually refers to the time observed in most of Europe, be it standard time or daylight saving time.
    CET: {
        dst: 2 * 60,
        nonDst: 60,
        dstStart: (d: Date) => getLastDayOfMonthTransition(d.getFullYear(), 2, 0, 2),
        dstEnd: (d: Date) => getLastDayOfMonthTransition(d.getFullYear(), 9, 0, 3),
    },
};

/**
 * Finds and returns timezone offset. If timezoneInput is numeric, it is returned. Otherwise, look for timezone offsets
 * in the following order: timezoneOverrides -> {@link TIMEZONE_ABBR_MAP} -> {@link AMBIGUOUS_TIMEZONE_ABBR}.
 *
 * @param timezoneInput Uppercase timezone abbreviation or numeric offset in minutes
 * @param date The date to use to determine whether to return DST offsets for ambiguous timezones
 * @param timezoneOverrides Overrides for unambiguous timezones
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

    // First try matching an unambiguous timezone
    const extractedTimezoneOffset = timezoneOverrides[timezoneInput] ?? TIMEZONE_ABBR_MAP[timezoneInput];
    if (extractedTimezoneOffset != null) {
        return extractedTimezoneOffset;
    }

    // If no match and we have a ref date, try matching an ambiguous timezone, and determine dst/non-dst based on ref date
    if (date == null) {
        return null;
    }
    const vartz = AMBIGUOUS_TIMEZONE_ABBR[timezoneInput];
    if (vartz == null) {
        return null;
    }
    if (dayjs(date).isAfter(vartz.dstStart(date)) && !dayjs(date).isAfter(vartz.dstEnd(date))) {
        return vartz.dst;
    }
    return vartz.nonDst;
}
