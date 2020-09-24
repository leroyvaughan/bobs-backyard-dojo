const globals = require('../lib/globals');


const scheduler = (req, res) => {

  const body = req.body;

  if (!body) {
    return res.status(400).json({
        success: false,
        error: globals.noRequestBodyErr,
    })
  }
  else {
    //has body
    _doScheduling(body.schedule_request)
      .then((resp) => {
        //TODO: digest response
        if(resp.isValid) {
          return res.status(200).json({
            success: true,
            data: resp
          });
        }
        else {
          return res.status(500).json({
            success: false,
            error: resp.errMsg
          });
        }

      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          error: err  //should be custom err from _doScheduling
        })
      });

  }
};


const _doScheduling = (postData) => {
  return new Promise((resolve, reject) => {
    try{
    //  const samplePostData = {
    //    persons: (n),
    //    timePerSession: {2 || 3},
    //    dates: [],
    //    scheduledDays: (n)  //1, 2, 3, 12
    //  };

      pricingScheduler.postSchedule(postData)
        .then((resp) => {
          resolve(resp);
        })
        .catch((e) => {
          // reject(`${globals.SchedulerErrTxt} ${e}`);
          throw e;
        });
    }
    catch(e) {
      //error should be {prod}logged or something here?
      console.log("err in scheduler:\t", e);
      reject(`${globals.SchedulerErrTxt} ${e}`);
    }
  });
}



module.exports = {
  scheduler
}