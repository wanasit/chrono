import dayjs from "dayjs";


export function findYearClosestToRef(refDate: Date, day: number, month: number) : number {

    //Find the most appropriated year
    const refMoment = dayjs(refDate);
    let dateMoment = refMoment;
    dateMoment = dateMoment.month(month - 1);
    dateMoment = dateMoment.date(day);
    dateMoment = dateMoment.year(refMoment.year())

    const nextYear = dateMoment.add(1, 'y');
    const lastYear = dateMoment.add(-1, 'y');
    if( Math.abs(nextYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment)) ){
        dateMoment = nextYear;
    }
    else if( Math.abs(lastYear.diff(refMoment)) < Math.abs(dateMoment.diff(refMoment)) ){
        dateMoment = lastYear;
    }

    return dateMoment.year();
}
