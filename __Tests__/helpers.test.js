const Helpers = require('../server/lib/helpers')();
const TestData = require('../server/data/index')();
const globals = require('../server/lib/globals')();

describe("Helper Funcs Tests", () => {

  const arrDates1 = ['07/13/2015', '07/14/2015'
    , '07/15/2015', '07/16/2015', '07/10/2015'];

  const arrDates2 = ['07/15/2015', '07/14/2015'
    , '07/15/2015', '07/15/2015', '07/13/2015'];

  const arrDates3 = ['07/13/2015', '07/13/2015'
    , '07/13/2015', '07/13/2015', '07/13/2015'];


  describe("isNull() Tests", () => {
    it("isNull() should return `true`", () => {
      expect(isNull()).toBe(true);
    });

    it('isNull("") should return `true`', () => {
      expect(isNull("")).toBe(true);
    })

    it("isNull(null) should return `true`", () => {
      expect(isNull(null)).toBe(true);
    });
  });


  describe("Date Functions Test", () => {

    describe("getMinAndMax() Test", () => {
      var result = Helpers.getMinAndMax(arrDates1);

      it("July 10th should be min", () => {
        let expected = new Date('07/10/2015');
        expect(result['min']).toEqual(expected);
      });

      it("July 16th should be max", () => {
        let expected = new Date('07/16/2015');
        expect(result['max']).toEqual(expected);
      });
    });



    describe("areAllDatesSame()", () => {
      it("should return false", () => {
        expect(Helpers.areAllDatesSame(arrDates2)).toBe(false);
      });

      it("should return true", () => {
        expect(Helpers.areAllDatesSame(arrDates3)).toBe(true);
      })
    });
  });//end Data Functions Tests



    describe("Week Data Checks", () => {
      describe("isSameWeek() Test", () => {
        it("should return `false`", () => {
          expect(Helpers.isSameWeek(arrDates1)).toBe(false);
        });

        it("should return `true`", () =>  {
          expect(Helpers.isSameWeek(arrDates2)).toBe(true);
        });
      });

      describe("isValidWeek() test", () => {

        //checking all weeks in the month...
        it("should return `true`", () => {
          let result1 = Helpers.isValidWeek(TestData.validWeek1);
          expect(result1.isValid).toBe(true);

          let result2 = Helpers.isValidWeek(TestData.validWeek2);
          expect(result2.isValid).toBe(true);

          let result3 = Helpers.isValidWeek(TestData.validWeek3);
          expect(result3.isValid).toBe(true);

          let result4 = Helpers.isValidWeek(TestData.validWeek4);
          expect(result4.isValid).toBe(true);

          let result5 = Helpers.isValidWeek(TestData.validWeek5);
          expect(result5.isValid).toBe(true);
        });
      });

      it("isValidWeek({ differing weeks }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.differingWeeks1);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DifferingWeeksErr);
      });

      it("isValidWeek({ differing weeks }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.differingWeeks2);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DifferingWeeksErr);
      });

      it("isValidWeek({ differingMonthIn3DaysWeek }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.differingMonthIn3DaysWeek);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DifferingWeeksErr);
      });

      it("isValidWeek({ invalid date(s) }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.badDateInWeek);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.InvalidDatesInWeekErr);
      });

      it("isValidWeek({ too many days }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.tooManyDaysInWeek);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DaysInWeekErr)
      });

      it("isValidWeek({ not enough days }) Test: should return false", () => {
        let result = Helpers.isValidWeek(TestData.notEnoughDaysInWeek);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DaysInWeekErr)
      });

    });// end Week Data Checks




    describe("Month Data Checks", () => {
      it("isSameMonth() Test: should return true", () => {
        expect(Helpers.isSameMonth(TestData.validMonth1))
          .toBe(true);
      });

      it("isSameMonth() Test: should return false", () => {
        expect(Helpers.isSameMonth(TestData.differingMonths1))
        .toBe(false);
      });

      it("isValidMonth() Test: should return true", () => {
        let result = Helpers.isValidMonth(TestData.validMonth1);
        expect(result.isValid).toBe(true);
      });

      it("isValidMonth() Test: should return true", () => {
        let result = Helpers.isValidMonth(TestData.validMonth2);
        expect(result.isValid).toBe(true);
      });

      it("isValidMonth({too many days}) Test: should return false", () => {
        let result = Helpers.isValidMonth(TestData.tooManyDaysInMonth);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.TooManyDaysErr);
      });
      it("isValidMonth({not enough days}) Test: should return false", () => {
        let result = Helpers.isValidMonth(TestData.notEnoughDaysInMonth);

        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.NotEnoughDaysErr);
      });

      it("isValidMonth({bad day in month}) Test: should return false", () => {
        let result = Helpers.isValidMonth(TestData.badDateInMonth);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.InvalidDateInMonthErr);
      });

      it("isValidMonth({differing month.days}) Test: should return false", () => {
        // console.log("--> added day from previous month");
        let result = Helpers.isValidMonth(TestData.differingMonths1);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DifferingMonthsErr);
      });

      it("isValidMonth({differing month.days}) Test: should return false", () => {
        // console.log("--> added day from month after");
        let result = Helpers.isValidMonth(TestData.differingMonths2);
        expect(result.isValid).toBe(false);
        expect(result.errMsg).toEqual(globals.DifferingMonthsErr);
      });
    });// end Month Data Checks


    describe("JSON Data Checks", () => {

      it("isValidNumberOfPeople(0) should return err", () => {
        expect(Helpers.isValidNumberOfPeople({ persons: 0 }))
        .toEqual(globals.InvalidNumberOfPeopleErr);
    });

    it("isValidNumberOfPeople('z') should return err", () => {
      expect(Helpers.isValidNumberOfPeople({ persons: 'z' }))
      .toEqual(globals.InvalidNumberOfPeopleErr);
    });

    it("isValidNumberOfPeople(null) should return err", () => {
      expect(Helpers.isValidNumberOfPeople({ persons: null }))
        .toEqual(globals.InvalidNumberOfPeopleErr);
      });

    it("isValidNumberOfPeople(1) should be true", () => {
      expect(Helpers.isValidNumberOfPeople({ persons: 1 }))
        .toEqual("");
    });

    it("isValidNumberOfPeople(3) should be true", () => {
      expect(Helpers.isValidNumberOfPeople({ persons: 3 }))
      .toEqual("");
    });

    it("isValidTimePerSession({}) should return err", () => {
      expect(Helpers.isValidTimePerSession({}))
      .toEqual(globals.InvalidTimePerSessionErr);
    });

    it("isValidTimePerSession(4) should return err", () => {
      expect(Helpers.isValidTimePerSession({ timePerSession: 4 }))
      .toEqual(globals.InvalidTimePerSessionErr);
    });

    it("isValidTimePerSession(1) should return err", () => {
      expect(Helpers.isValidTimePerSession({ timePerSession: 1 }))
      .toEqual(globals.InvalidTimePerSessionErr);
    });

    it("isValidTimePerSession('z') should return err", () => {
      expect(Helpers.isValidTimePerSession({ timePerSession: '1' }))
      .toEqual(globals.InvalidTimePerSessionErr);
    });

    it("isValidTimePerSession(2) should be true", () => {
      expect(Helpers.isValidTimePerSession({ timePerSession: 2 }))
      .toEqual("");
    });

    it("isValidTimePerSession(3) should be true", () => {
      expect(Helpers.isValidTimePerSession({ timePerSession: 3 }))
        .toEqual("");
      });



    it("isValidDatesArray({}) should return false", () => {
      let result = Helpers.isValidDatesArray({});
      expect(result).toBe(globals.NoDatesArrayErr);
    });

    it("isValidDatesArray({ 3 dates, len: 1 }", () => {
      //testing case 1
      let result = Helpers.isValidDatesArray({ dates: TestData.validWeek1 }, 1);
      expect(result).toBe(globals.DatesScheduleErr);
    });

    it("isValidDatesArray({ 2 Days in differing weeks }", () => {
      //testing case 2
      let result = Helpers.isValidDatesArray(
        { dates: ["10/9/2020", "10/12/2020"] }, 2);

      expect(result).toBe(globals.DifferingWeeksErr);
    });

    it("isValidDatesArray({ 1 date, len: 2 }", () => {
      //testing case 2
      let result = Helpers.isValidDatesArray(
        { dates: ["10/9/2020"] }, 2);

      expect(result).toBe(globals.DatesScheduleErr);
    });

    it("isValidDatesArray({ 2 dates, len: 3 }", () => {
      //testing case 3
      let result = Helpers.isValidDatesArray(
        { dates: ["10/9/2020", "10/12/2020"] }, 3);

      expect(result).toBe(globals.DaysInWeekErr);
    });

    it("isValidDatesArray({ 2 dates, len: 12 }", () => {
      //testing case 12
      let result = Helpers.isValidDatesArray(
        { dates: ["10/9/2020", "10/12/2020"] }, 12);

      expect(result).toBe(globals.NotEnoughDaysErr);
    });


  });//end Json Data Checks







});//end Test Suite