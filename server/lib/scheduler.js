// const data = require('../data');

const globals = require('./globals')();
const helpers = require('./helpers')();


const returnObj = function() {
  const self = this;



  //leave no room for error in data later on
  const _checkData = (json, len) => {
    let dataCheck = { isValid: false }, errMsg = "";

    //check people
    let peepsInErr = isValidNumberOfPeople(json);
    if(peepsInErr != "") {
      dataCheck.errMsg = peepsInErr;
      return dataCheck;
    }

    //check time per session
    let timeInErr = isValidTimePerSession(json);
    if(timeInErr != "") {
      dataCheck.errMsg = timeInErr;
      return dataCheck;
    }

    let datesInErr = isValidDatesArray(json, len);
    if(datesInErr !== "") {
      dataCheck.errMsg = datesInErr;
      return dataCheck;
    }

    //  ...data check has passed
    dataCheck.isValid = true;

    return dataCheck;
  };
  self.checkDataTest = (json, len) => {
    return _checkData(json, len);
  };




  self.chargeOneMonth = (json) => {
    return _chargeMultipleDays(json, 12);
  };

  self.chargeOneWeek = (json) => {
    return _chargeMultipleDays(json, 3);
  };

  self.chargeTwoDays = (json) => {
    return _chargeMultipleDays(json, 2);
  };


  const _chargeMultipleDays = (json, scheduledDays) => {
    let curObj = processDataForCost(json, scheduledDays);
    if(curObj.isValid) {
      let cost = curObj.cost * scheduledDays;
      curObj.cost = cost;
    }

    return curObj;
  };
  // self.chargeMultipleDays = (json, scheduledDays) => {
  //   return _chargeMultipleDays(json, scheduledDays);
  // };


  const _chargeOneDay = (json) => {
    //will return isValid(bool), with errMsg if err
    return processDataForCost(json, 1);
  };
  self.chargeOneDay = (json) => {
    return _chargeOneDay(json);
  };


  //testing: Scheduler.chargeOneDay = jest.fn();
  const processDataForCost = (json, scheduledDays) => {
    const dataCheck = _checkData(json, scheduledDays);

    if (dataCheck.isValid) {
      return calculateSessionPrice(json);
    }
    else {//err: isValid = false
      return dataCheck;
    }
  };

  return self;
};//end returnObj


module.exports = () => {
  return new returnObj();
};

