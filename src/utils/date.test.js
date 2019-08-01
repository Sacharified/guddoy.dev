import { formatDate } from "./date";

describe(`Date Utils`, () => {
    describe(`formatDate()`, () => {
        test(`Formats the date`, () => {
            const date = new Date("2019-08-01T21:43:00.845Z");
            expect(formatDate(date)).toEqual("Thursday, August 1st, 2019, 10:43:00 PM");
        });
    });
});