import dayjs from "dayjs";

/**
 * Find the most likely year, from a raw number. For example:
 * 1997 => 1997
 * 97 => 1997
 * 12 => 2012
 */
export function findMostLikelyADYear(yearNumber: number): number {
    if (yearNumber < 100) {
        if (yearNumber > 50) {
            yearNumber = yearNumber + 1900;
        } else {
            yearNumber = yearNumber + 2000;
        }
    }

    return yearNumber;
}

export function findYearClosestToRef(refDate: Date, day: number, month: number): number {
    //Find the most appropriated year
    const refMoment = dayjs(refDate);
    let dateMoment = refMoment;
    dateMoment = dateMoment.month(month - 1);
    dateMoment = dateMoment.date(day);
    dateMoment = dateMoment.year(refMoment.year());

    const nextYear = dateMoment.add(1, "y");
    const lastYear = dateMoment.add(-1, "y");
    if (Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
        dateMoment = nextYear;
    } else if (Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment))) {
        dateMoment = lastYear;
    }

    return dateMoment.year();
}
