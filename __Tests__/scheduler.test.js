const Scheduler = require('../server/lib/scheduler')();
let elData = require('../server/data/index')();
const globals = require('../server/lib/globals')();
const Helpers = require('../server/lib/helpers')();


describe("Scheduler Tests", () => {
  const _2Hrs = globals.TwoHourSessionPrice;
  const _3Hrs = globals.ThreeHourSessionPrice;
  const _1WeekDiscount = globals.OneWeekDiscount;
  const _1MonthDiscount = globals.MonthlyDiscount;
  const _GroupDiscount = globals.GroupDiscount;


  describe("chargeOnDay() Tests", () => {
    it("1 Person - 1 Day @ 2 Hrs", () => {
      const expectedCost = _2Hrs * 1;
      expect(
        Scheduler.chargeOneDay(elData.oneDay_2Hours).cost
      ).toEqual(expectedCost);
    });

    it("3 Person - 1 Day @ 2 Hrs", () => {
      const baseCost = _2Hrs * 3; //120
      const withGroupDiscount = Helpers.processDiscount(baseCost,  _GroupDiscount);

      expect(
        Scheduler.chargeOneDay(elData.oneDay_2Hours_group).cost
      ).toEqual(withGroupDiscount);
    });


    it("1 Person - 1 Day @ 3 Hrs", () => {
      const expectedCost = _3Hrs * 1;

      expect(
        Scheduler.chargeOneDay(elData.oneDay_3Hours).cost
      ).toEqual(expectedCost);
    });

    it("3 Person - 1 Day @ 3 Hrs", () => {
      const baseCost = _3Hrs * 3;
      const withGroupDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(
        Scheduler.chargeOneDay(elData.oneDay_3Hours_group).cost
      ).toEqual(withGroupDiscount);
    });
  });//end chargeOneDay() Tests



  describe("chargeTwoDays() Tests", () => {
    it("1 Person - 2 Days @ 2 Hrs", () => {
      const expectedCost = (2 * _2Hrs);

      expect(
        Scheduler.chargeTwoDays(elData.twoDays_2Hours).cost)
          .toEqual(expectedCost);
    });

    it("1 Person - 2 Days @ 3 Hrs", () => {
      const expectedCost = 2 * _3Hrs;

      expect(Scheduler.chargeTwoDays(elData.twoDays_3Hours).cost)
        .toEqual(expectedCost);
    });


    it("2 Person - 2 Days @ 2 Hrs", () => {
      const baseCost = 2 * (2 * _2Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeTwoDays(elData.twoDays_2Hours_group).cost)
        .toEqual(withDiscount);
    });

    it("2 Person - 2 Days @ 3 Hrs", () => {
      const baseCost = 2 * (2 * _3Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeTwoDays(elData.twoDays_3Hours_group).cost)
        .toEqual(withDiscount);
    });
  });//end chargeTwoDays() Tests



  describe("chargeOneWeek() Tests", () => {

    it("1 person - 1 Week @ 2 Hrs", () => {
      const expectedCost = 3 * _2Hrs;

      expect(Scheduler.chargeOneWeek(elData.threeDays_2Hours).cost)
        .toEqual(expectedCost);
    });

    it("1 person - 1 Week @ 3 Hrs", () => {
      const expectedCost = 3 * _3Hrs;

      expect(Scheduler.chargeOneWeek(elData.threeDays_3Hours).cost)
        .toEqual(expectedCost);
    });

    it("3 Person - 1 Week @ 2 Hrs", () => {
      const baseCost = 3 * (3 * _2Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeOneWeek(elData.threeDays_2Hours_group).cost)
        .toEqual(withDiscount);
    });

    it("4 Person - 1 Week @ 3 Hrs", () => {
      const baseCost = 4 * (3 * _3Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeOneWeek(elData.threeDays_3Hours_group).cost)
        .toEqual(withDiscount);
    });


    ////should return undefined...should it be fixed?
    // it("3 Person - 1 Week @ 3 Hrs", () => {
    //   const baseCost = 3 * (2 * _3Hrs);
    //   const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

    //   expect(Scheduler.chargeOneWeek(elData.threeDays_2Hours_group).cost)
    //     .toEqual(withDiscount);
    // });
  });//end chargeOneWeek() Tests


  describe("chargeOneMonth() Tests", () => {

    it("1 Person - 1 Month @ 2 Hrs", () => {
      const expectedCost = 12 * _2Hrs;

      expect(Scheduler.chargeOneMonth(elData.monthly_2Hours).cost)
        .toEqual(expectedCost);
    });

    it("1 Person - 1 Month @ 3 Hrs", () => {
      const expectedCost = 12 * _3Hrs;

      expect(Scheduler.chargeOneMonth(elData.monthly_3Hours).cost)
        .toEqual(expectedCost);
    });

    it("3 Persons - 1 Month @ 2 Hrs", () => {
      const baseCost = 3 * (12 * _2Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeOneMonth(elData.monthly_2Hours_group).cost)
        .toEqual(withDiscount);
    });

    it("2 Persons - 1 Month @ 3 Hrs", () => {
      const baseCost = 2 * (12 * _3Hrs);
      const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);

      expect(Scheduler.chargeOneMonth(elData.monthly_3Hours_group).cost)
        .toEqual(withDiscount);
    });

  });//end chargeOneMonth() Tests


  describe("checkData() Tests", () => {

    it("bad `persons` key in checkData should return false w/ err", () => {
      const badJson = { timePerSession: 2, dates: elData.validMonth1 };
      const result = Scheduler.checkDataTest(badJson, 12);

      expect(result.isValid).toBe(false);
      expect(result.errMsg).toEqual(globals.invalidNumberOfPeopleErr);
    });

    it("bad `timePerSession` key in json should return false w/ err", () => {
      const badJson = { persons: 1, dates: elData.validWeek5 };
      let result = Scheduler.checkDataTest(badJson, 3);

      expect(result.isValid).toBe(false);
      expect(result.errMsg).toEqual(globals.invalidTimePerSessionErr);
    });

    it("bad 'dates' key in json should return false", () => {
      const badJson = { persons: 1, timePerSession: 3 };
      let result = Scheduler.checkDataTest(badJson, 12);

      expect(result.isValid).toBe(false);
      expect(result.errMsg).toEqual(globals.NoDatesArrayErr);
    });
  });//end checkData() Tests


});//end "Scheduler Tests"...

