class DateUtils {

    constructor() {}

    static isDateGreaterThanToday(dateString: string): boolean {
        const inputDate: Date = new Date(dateString);
        const today: Date = new Date();

        inputDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        return inputDate > today;
    }
}

export default DateUtils;