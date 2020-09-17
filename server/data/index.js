/*
  Holds data objects for Jest Tests
    - should not be a `const`, want to hotswap data in tests
    -> { valid dates, invalid dates, incorrect data }
*/

var returnObj = function() {
  const self = this;

  //<-[BEGIN]-> 'same' data ("valid" week/month)

  const _firstAndLastDays = ["10/1/2020", "10/31/2020"];

  const _validWeek1 = ["10/1/2020", "10/2/2020", "10/3/2020"];
  const _validWeek2 = ["10/4/2020", "10/6/2020", "10/10/2020"];
  const _validWeek3 = ["10/11/2020", "10/12/2020", "10/17/2020"];
  const _validWeek4 = ["10/18/2020", "10/23/2020", "10/24/2020"];
  const _validWeek5 = ["10/25/2020", "10/27/2020", "10/31/2020"];

  const _validMonth1 = [
    "10/1/2020", "10/2/2020", "10/3/2020",
    "10/4/2020", "10/6/2020", "10/9/2020",
    "10/11/2020", "10/13/2020", "10/17/2020",
    "10/25/2020", "10/28/2020", "10/31/2020"
  ];
  const _validMonth2 = [
    "10/1/2020", "10/4/2020", "10/7/2020",
    "10/14/2020", "10/16/2020", "10/19/2020",
    "10/21/2020", "10/23/2020", "10/26/2020",
    "10/27/2020", "10/28/2020", "10/31/2020"
  ];

  self.validWeek1 = _validWeek1;
  self.validWeek2 = _validWeek2;
  self.validWeek3 = _validWeek3;
  self.validWeek4 = _validWeek4;
  self.validWeek5 = _validWeek5;

  self.validMonth1 = _validMonth1;
  self.validMonth2 = _validMonth2;


  var _1Day_2Hours = { persons: 1, timePerSession: 2,
    dates: ["10/1/2020"]
  };
  var _1Day_2Hours_group = { persons: 3, timePerSession: 2,
    dates: ["10/31/2020"]
  };
  var _1Day_3Hours = { persons: 1, timePerSession: 3,
    dates: ["10/1/2020"]
  };
  var _1Day_3Hours_group = { persons: 3, timePerSession: 3,
    dates: ["10/31/2020"]
  };


  var _2Days_2Hours = { persons: 1, timePerSession: 2,
    dates: _validWeek1.slice(1)
  };
  var _2Days_2Hours_group = { persons: 2, timePerSession: 2,
    dates: _validWeek2.slice(1)
  };
  var _2Days_3Hours = { persons: 1, timePerSession: 3,
    dates: _validWeek3.slice(1)
  };
  var _2Days_3Hours_group = { persons: 2, timePerSession: 3,
    dates: _validWeek4.slice(1)
  };


  var _3Days_2Hours = {
    persons: 1,
    timePerSession: 2,
    dates: _validWeek1
  };
  var _3Days_2Hours_group = {
    persons: 3,
    timePerSession: 2,
    dates: _validWeek2
  };
  var _3Days_3Hours = {
    persons: 1,
    timePerSession: 3,
    dates: _validWeek3
  };
  var _3Days_3Hours_group = {
    persons: 4,
    timePerSession: 3,
    dates: _validWeek4
  };

  var _monthly_2Hours = {
    persons: 1,
    timePerSession: 2,
    dates: _validMonth1
  };
  var _monthly_2Hours_group = {
    persons: 3,
    timePerSession: 2,
    dates: _validMonth1
  };
  var _monthly_3Hours =  {
    persons: 1,
    timePerSession: 3,
    dates: _validMonth2
  };
  var _monthly_3Hours_group =  {
    persons: 2,
    timePerSession: 3,
    dates: _validMonth2
  };


  //-->   same week
  self.oneDay_2Hours = _1Day_2Hours;
  self.oneDay_2Hours_group = _1Day_2Hours_group;

  self.oneDay_3Hours = _1Day_3Hours;
  self.oneDay_3Hours_group = _1Day_3Hours_group;


  self.twoDays_2Hours = _2Days_2Hours;
  self.twoDays_2Hours_group = _2Days_2Hours_group;

  self.twoDays_3Hours = _2Days_3Hours;
  self.twoDays_3Hours_group = _2Days_3Hours_group;


  self.threeDays_2Hours = _3Days_2Hours;
  self.threeDays_2Hours_group = _3Days_2Hours_group;

  self.threeDays_3Hours = _3Days_3Hours;
  self.threeDays_3Hours_group = _3Days_3Hours_group;


  //--> same month
  self.monthly_2Hours = _monthly_2Hours;
  self.monthly_2Hours_group = _monthly_2Hours_group;

  self.monthly_3Hours = _monthly_3Hours;
  self.monthly_3Hours_group = _monthly_3Hours_group;

//  <-[END]-> 'same data' ("valid" week/month)




//  <-[BEGIN]-> "inValid" week data

  const _differingWeeks1 = ["10/1/2020", "10/2/2020", "10/31/2020"];
  const _differingWeeks2 = ["10/4/2020", "10/6/2020", "10/11/2020"];
  self.differingWeeks1 = _differingWeeks1;
  self.differingWeeks2 = _differingWeeks2;

  const _badDateInWeek = ["10/1/2020", "10/2/2020", "10/41/2020"];
  self.badDateInWeek = _badDateInWeek;

  const _differingMonthIn3DaysWeek = ["9/1/2020", "10/1/2020", "10/2/2020"];
  self.differingMonthIn3DaysWeek = _differingMonthIn3DaysWeek;

  const _tooManyDaysInWeek = _validMonth1;
  self.tooManyDaysInWeek = _tooManyDaysInWeek;

  const _notEnoughDaysInWeek = _validWeek1.slice(1);
  self.notEnoughDaysInWeek = _notEnoughDaysInWeek;

//  <-[END]-> "inValid" week data




  //<-[BEGIN]-> "inValid" month data

  //  -->too many days
  const _tooManyDaysInMonth = [
    "10/1/2020", "10/2/2020", "10/3/2020",
    "10/4/2020", "10/6/2020", "10/9/2020",
    "10/11/2020", "10/13/2020", "10/17/2020",
    "10/25/2020", "10/28/2020", "10/31/2020", "10/12/2020"
  ];
  self.tooManyDaysInMonth = _tooManyDaysInMonth;

  //--> not enough days
  const _notEnoughDaysInMonth = [
    "10/1/2020", "10/4/2020", "10/7/2020",
    "10/14/2020", "10/16/2020", "10/19/2020",
    "10/21/2020", "10/23/2020", "10/26/2020",
    "10/27/2020", "10/31/2020"
  ];
  self.notEnoughDaysInMonth = _notEnoughDaysInMonth;

  //--> bad data
  const _badDateInMonth = [
    "10/1/2020", "10/2/2020", "10/3/2020",
    "10/4/2020", "10/6/2020", "10/9/2020",
    "10/11/2020", "10/13/2020", "10/17/2020",
    "10/25/2020", "10/28/2020", "10/32/2020"  //<---
  ];
  self.badDateInMonth = _badDateInMonth;

  //differing months
  const _differingMonths1 = [
    "10/1/2020", "10/2/2020", "10/3/2020",
    "10/4/2020", "10/6/2020", "10/9/2020",
    "10/11/2020", "10/53/2020", "10/17/2020",
    "10/25/2020", "10/28/2020", "9/30/2020"  //<---
  ];
  self.differingMonths1 = _differingMonths1;

  const _differingMonths2 = [
    "10/1/2020", "10/2/2020", "10/3/2020",
    "10/4/2020", "10/6/2020", "10/9/2020",
    "10/11/2020", "10/13/2020", "10/17/2020",
    "10/25/2020", "10/31/2020", "11/31/2020"  //<---
  ];
  self.differingMonths2 = _differingMonths2;

//  <-[END]-> "invalid" Month data



  return self;
};



module.exports = () => {
  return new returnObj();
};