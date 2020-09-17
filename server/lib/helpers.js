const globals = require('./globals')();

var returnObj = function() {

  //https://stackoverflow.com/questions/31422033/check-if-selected-dates-are-from-the-same-week-javascript

  //used by the other two date functions
  const _getMinAndMax = function(dates) {
    var result = {};

    for (var index in dates) {
      var thisDate = dates[index]
        , dateParts = thisDate.split(/\//)
        , fullDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);

      if (!result['max'] || fullDate > result['max']) {
        result['max'] = fullDate;
      }

      if (!result['min'] || fullDate < result['min']) {
        result['min'] = fullDate;
      }
    }

    return result;
  };
  self.getMinAndMax = (dates) => {
    return _getMinAndMax(dates);
  };

  const _isSameWeek = (dates) => {
    var minAndMax = _getMinAndMax(dates)
      , dayOfWeek = {}

    dayOfWeek['min'] = minAndMax['min'].getDay();
    dayOfWeek['max'] = minAndMax['max'].getDay();

    if (minAndMax['max'] - minAndMax['min'] > 518400000 ||
      dayOfWeek['min'] > dayOfWeek['max']) {
      return false;
    }

    return true;
  };
  self.isSameWeek = (dates) => {
    return _isSameWeek(dates);
  };


  const _areAllDatesSame = (dates) => {
    var minAndMax = _getMinAndMax(dates);
    return minAndMax['min'] == minAndMax['max']
  };
  self.areAllDatesSame = (dates) => {
    return _areAllDatesSame(dates);
  };



  //my functions --------------------------------------->

  //--------- WEEK CHECKING ----
  //--> all days ( >1 ) must be in the same week
  const _isValidWeek = (dates, arrLen = globals.validWeekDaysNum) => {
    let len = dates.length, isValid = true, errMsg = "";
    let baseMsg = "Invalid Dates Array:";

    //check correct # of days in array vs. selected days
    if(len !== arrLen) {
      errMsg = globals.DaysInWeekErr;
      isValid = false;
      return { isValid, errMsg };
    }

    //now check if any dates are bad dates
    for(var x=0; x<len; x++) {
      if(new Date(dates[x]) == "Invalid Date") {
        errMsg = globals.InvalidDatesInWeekErr;
        isValid = false;
        break;
      }
    }

    //finally check if in same week, per Use Case rule
    if(isValid) {
      isValid = _isSameWeek(dates);
        if (!isValid) {
          errMsg = globals.DifferingWeeksErr;
        }
    }

    return { isValid, errMsg };
  };
  self.isValidWeek = (dates, arrLen) =>{
    return _isValidWeek(dates, arrLen);
  }



  //--------- MONTH CHECKING ----
  //--> all 12 days must be in the same (valid) month

  const _isSameMonth = (dates) => {
    const scheduleMonth = dates[0].split('/')[0];

    for (var x = 0; x < dates.length; x++) {
      if (dates[x].split('/')[0] !== scheduleMonth) {
        return false;
      }
    }

    return true;
  };
  self.isSameMonth = (dates) => {
    return _isSameMonth(dates);
  };


  const _isValidMonth = (dates, arrLen = globals.validMonthDaysNum) => {
    let len = dates.length, errMsg;

    //first check against 12 days/month schedule
    if (len !== arrLen) {
      if (len > arrLen) {
        errMsg = globals.TooManyDaysErr;
      }
      else {
        errMsg = globals.NotEnoughDaysErr;
      }

      return { isValid: false, errMsg };
    }
    else {
      //now check for dates validity
      let isValid = _isSameMonth(dates), errMsg;

      if (!isValid) {
        errMsg = globals.DifferingMonthsErr;
        return { isValid: false, errMsg };
      }
      else {
        for (var x = 0; x < len; x++) {
          if (new Date(dates[x]) == "Invalid Date") {
            errMsg = globals.InvalidDateInMonthErr;
            return { isValid: false, errMsg };
          }
        }
      }
    }

    return { isValid: true };
  };
  self.isValidMonth = (dates, arrLen) => {
    return _isValidMonth(dates, arrLen);
  };
//  <-[END]-> dates helpers





//  <-[BEGIN]-> data checking helpers

  const _isValidNumberOfPeople = (json) => {
    let errMsg = "";

    if (isNull(json.persons)) {
      errMsg = globals.invalidNumberOfPeopleErr;
    }
    else {
      try {
        if(typeof(json.persons) !== 'number'){
          errMsg = globals.invalidNumberOfPeopleErr;
        }

        const numOfPeeps = parseInt(json.persons);

        if (numOfPeeps < 1) {
          errMsg = globals.invalidNumberOfPeopleErr;
        }
      }
      catch (e) {
        errMsg = globals.invalidNumberOfPeopleErr;
      }
    }

    return errMsg;
  };
  self.isValidNumberOfPeople = (json) => {
    return _isValidNumberOfPeople(json);
  };


  const _isValidTimePerSession = (json) => {
    let errMsg = "";

    if (!json.timePerSession) {
      errMsg = globals.invalidTimePerSessionErr;
    }
    else {
      try {
        if(typeof(json.timePerSession) !== 'number') {
          errMsg = globals.invalidTimePerSessionErr;
        }

        const sessionTime = parseInt(json.timePerSession);
        if (sessionTime < 2 || sessionTime > 3) {
          errMsg = globals.invalidTimePerSessionErr;
        }
      }
      catch (e) {
        errMsg = globals.invalidTimePerSessionErr;
      }
    }

    return errMsg;
  };
  self.isValidTimePerSession = (json) => {
    return _isValidTimePerSession(json);
  };


  //### Check for proper dates Array and for rules:
  /*
    - 2 or 3 day sessions must be in the same week
    - a monthly schedule submission should be in same month
  */
  const _isValidDatesArray = (json, len) => {
    let baseMsg2 = "Malformed Data:"
    let errMsg = "";

    if (!json.dates) {
      errMsg = `${baseMsg2} No dates!`;
    }
    else {
      try {
        var dates = json.dates;

        switch(parseInt(len)) {
          case 1:
            if(dates.length !== 1) {
              errMsg = globals.DatesScheduleErr;
            }
            break;

          case 2:
            if(dates.length !== 2) {
              errMsg = globals.DatesScheduleErr;
            }
            else{
              if(!isSameWeek(dates)) {
                errMsg = globals.DifferingWeeksErr;
              }
            }
            break;

          case 3:
            var result = _isValidWeek(dates, 3);
            if(!result.isValid) {
              errMsg = result.errMsg;
            }
            break;

          case 12:
            var result = _isValidMonth(dates, 12);
            if(!result.isValid) {
              errMsg = result.errMsg;
            }
            break;

          default:
            errMsg = `${baseMsg2} dates object error!`;
        }
      }
      catch (e) {
        errMsg = `${baseMsg2} dates object error!`;
      }
    }

    return errMsg;
  };
  self.isValidDatesArray = (json, len) => {
    return _isValidDatesArray(json, len);
  };



  const _processDiscount = (cost, discount) => {
    if(!_isNull(discount)) {
      let adjustedPrice = cost - (cost * (discount / 100));
      cost = adjustedPrice;
    }

    return cost;
  };
  self.processDiscount = (cost, discount) => {
    return _processDiscount(cost, discount);
  };


  //no need for err handling, dataCheck isValid in scheduler.js
  const _calculateSessionPrice = (json) => {
    const _2hrPrice = globals.TwoHourSessionPrice;
    const _3hrPrice = globals.ThreeHourSessionPrice;
    let returnObj = { isValid: true }, cost;

    //either...or, ONLY!
    if (json.timePerSession === 2) {
      cost = _2hrPrice * json.persons;
    }
    else if (json.timePerSession === 3) {
      cost = _3hrPrice * json.persons;
    }

    if (json.persons > 1) {
      cost = _processDiscount(cost, globals.GroupDiscount);
    }

    returnObj.cost = cost;
    return returnObj;
  };
  self.calculateSessionPrice = (json) => {
    return _calculateSessionPrice(json);
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

    return false;
  };
  self.isNull = _isNull;








  return self;

};//end returnObj


module.exports = () => {
  return new returnObj();
};

