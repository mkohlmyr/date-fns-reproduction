const { utcToZonedTime } = require("date-fns-tz");

function fr_FR(isoTimestamp) {
  return utcToZonedTime(isoTimestamp, 'Europe/Paris');
}

describe('date-fns-tz: fr_FR', () => {
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
      const iso = dt.toISOString();
      const actual = fr_FR(iso);
      expect(actual.getDate()).toBe(date);
      expect(actual.getHours()).toBe(hours);
    }
  );
});


// 
// 
//     ${'Fri Dec 31 2021 22:29:59 GMT+0200'} | ${31}  | ${21}
// ${ 'Sat Jan 01 2022 03:30:01 GMT+0200' } | ${ 1 }   | ${ 2 }
// ${ 'Sun Mar 27 2022 01:30:00 GMT+0530' } | ${ 26 }  | ${ 21 }
// ${'Sun Mar 28 2021 13:01:01 GMT+1100'} | ${28}  | ${4}
//     ${'Sun Mar 28 2021 04:01:01 UTC+0200'} | ${28}  | ${4}
//     ${'Sat Oct 30 2021 13:59:59 GMT-0800'} | ${30}  | ${23}
//     ${'Sat Oct 30 2021 18:01:01 GMT-0800'} | ${31}  | ${3}
//     ${'Fri Dec 31 2021 22:29:59 GMT+0200'} | ${31}  | ${21}
//     ${'Sat Jan 01 2022 03:30:01 GMT+0200'} | ${1}   | ${1}
//     ${'Sun Mar 27 2022 01:30:00 GMT+0530'} | ${26}  | ${21}
//     ${'Sat Mar 26 2022 21:00:00 UTC+0100'} | ${26}  | ${21}