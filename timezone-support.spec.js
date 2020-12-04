const { findTimeZone, getZonedTime, getUnixTime } = require("timezone-support");

function fr_FR(date) {
  return getZonedTime(date, findTimeZone('Europe/Paris'));
}

describe('timezone-support: fr_FR', () => {
  test.each`
    dateTime                               | date   | hours
    ${'Sun Mar 28 2021 10:59:59 GMT+1100'} | ${28}  | ${0}
    ${'Sun Mar 28 2021 13:01:01 GMT+1100'} | ${28}  | ${4}
    ${'Sun Mar 28 2021 04:01:01 UTC+0200'} | ${28}  | ${4}
    ${'Sat Oct 30 2021 13:59:59 GMT-0800'} | ${30}  | ${23}
    ${'Sat Oct 30 2021 18:01:01 GMT-0800'} | ${31}  | ${3}
    ${'Sat Mar 26 2022 21:00:00 UTC+0100'} | ${26}  | ${21}
  `('Returns date $date and hours $hours for Paris given $dateTime',
    ({ dateTime, date, hours }) => {
      const dt = new Date(dateTime);
      const actual = fr_FR(dt);
      expect(actual.day).toBe(date);
      expect(actual.hours).toBe(hours);
    }
  );
});