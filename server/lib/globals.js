
//global object to use
const returnObj = function() {
  const self = this;

  //set as constant so they're unchangable
  const _twoHourSessionPrice = 40;
  const _threeHourSessionPrice = 55;
  const _oneWeekDiscount = 10; // 10%
  const _monthlyDiscount = 20; // 20%
  const _groupDiscount = 30; // 30% per person
  const _validMonthDaysNum = 12;
  const _validWeekDaysNum = 3;

  self.TwoHourSessionPrice = _twoHourSessionPrice
  self.ThreeHourSessionPrice = _threeHourSessionPrice;
  self.OneWeekDiscount = _oneWeekDiscount;
  self.MonthlyDiscount = _monthlyDiscount;
  self.GroupDiscount = _groupDiscount;
  self.validMonthDaysNum = _validMonthDaysNum;
  self.validWeekDaysNum = _validWeekDaysNum;


  // err messages
  const baseErrMsg = "Invalid Dates Array:";
  const _datesScheduleErr =
    `${baseErrMsg} days submitted does not match # of days for schedule type requested`;
  self.DatesScheduleErr = _datesScheduleErr;

  const _daysInWeekErr =
    `${baseErrMsg} should be 3 days in a selected week!`;
  self.DaysInWeekErr = _daysInWeekErr;

  const _invalidDatesInWeekErr =
    `${baseErrMsg} bad date in dates selected!`;
  self.InvalidDatesInWeekErr = _invalidDatesInWeekErr;

  const _differingWeeksErr =
    `${baseErrMsg} dates are not in the same week!`;
  self.DifferingWeeksErr = _differingWeeksErr;


  const _noDatesArrayErr = "Malformed Data: No dates!";
  self.NoDatesArrayErr = _noDatesArrayErr;

  const _differingMonthsErr = "Dates are not in same month!";
  self.DifferingMonthsErr = _differingMonthsErr;

  const _invalidDateInMonthErr = "Invalid date in months selected!";
  self.InvalidDateInMontErr = _invalidDateInMonthErr;

  const _notEnoughDaysErr = "Not enough days in selected schedule!";
  self.NotEnoughDaysErr = _notEnoughDaysErr;

  const _tooManyDaysErr = "Too many days in selected schedule!";
  self.TooManyDaysErr = _tooManyDaysErr;


  const _invalidNumberOfPeopleErr = "Invalid number of people for session!";
  self.InvalidNumberOfPeopleErr = _invalidNumberOfPeopleErr;

  const _invalidTimePerSessionErr = "Invalid time per session!";
  self.InvalidTimePerSessionErr = _invalidTimePerSessionErr;

  const _noRequestBodyErr = "No request body!";
  self.NoRequestBodyErr = _noRequestBodyErr;

  const _schedulerErrTxt = "Error in Scheduler:";
  self.SchedulerErrTxt = _schedulerErrTxt;



  return self;
};//end returnObj



//self instantiation...
module.exports = () => {
  return new returnObj();
};







const _isNull = function (inVar) {
  if (typeof inVar === 'undefined') {
    return true;
  }
  else if (typeof inVar === 'string') {
    if (inVar === '') {
      return true;
    }
  }
  else if (inVar === null) {
    return true;
  }
  else if (typeof inVar === 'object') {
    if (Object.keys(inVar).length < 1) {
      return true;
    }
  }

  return false;
};
global.isNull = _isNull;