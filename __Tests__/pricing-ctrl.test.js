const Helpers = require('../server/lib/helpers')();
const globals = require('../server/lib/globals')();
const elData = require('../server/data/index')();
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);


describe("Pricing Controller Tests", () => {
  let api;

    beforeEach(() => {
      api = request.post('/api/schedule')
        .set('Accept', 'application/json');
    });


  describe("should return error", () =>{

  it('posts without json body/schedule data', async done => {
    const expected = { "success": false, "error": globals.NoRequestBodyErr };

    const res = await api.send();

    expect(res.status).toBe(400);
    expect(res.body).toEqual(expected);
    done();
  });

  /*
    No need to duplicate all valid/invalid data input to server/lib/helpers.js
      > most testing is done via scheduler.js and helper.js
      > only need to test the logic branching in pricing-ctrl.js
  */

  it('posts without an empty dates array', async done => {
    const emptyDatesArrayPost = {
      "scheduledDays": 1, "persons": 1, "timePerSession": 3, "dates": []
    };
    const expected = { success: false, error: globals.DatesScheduleErr };
    const res = await api.send(emptyDatesArrayPost);

    expect(res.status).toBe(500);
    expect(res.body).toEqual(expected);
    done();
  });



  it('posts without a dates array', async done => {
    const noDatesObjectPost = {
      "scheduledDays": 1, "persons": 1, "timePerSession": 3
    };
    const expected = {
      success: false, error: globals.NoDatesArrayErr
    };
    const res = await api.send(noDatesObjectPost);

    expect(res.status).toBe(500);
    expect(res.body).toEqual(expected);
    done();
  });




  it("posts with 'z' as scheduledDays value", async done => {
    const invalidScheduledDaysPost = {
      "scheduledDays": "z", "persons": 1, "timePerSession": 3, "dates": ["10/1/2020"]
    };
    const res = await api.send(invalidScheduledDaysPost);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toMatch('Error in Scheduler');
    done();
  });



  it("posts w/out 'scheduledDays' key in json post data"
    , async done => {

      const noScheduledDaysPost = {
        "persons": 1, "timePerSession": 3, "dates": ["10/1/2020"]
      };

      const res = await api.send(noScheduledDaysPost);

      expect(res.status).toBe(500);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toMatch('Error in Scheduler');
      done();
    });

  });//<-[END]->  "should return error"




  describe("should return success", () =>  {
    let postData = {
      "persons": 1, "timePerSession": 3, "dates": ["10/1/2020"]
    };

    const _2Hrs = globals.TwoHourSessionPrice;
    const _3Hrs = globals.ThreeHourSessionPrice;
    const _1WeekDiscount = globals.OneWeekDiscount;
    const _1MonthDiscount = globals.MonthlyDiscount;
    const _GroupDiscount = globals.GroupDiscount;


    it("posts 'scheduledDays' value of 1", async done => {
        postData.scheduledDays = 1;
        const expected = { "cost": 55, "isValid": true };
        const res = await api.send(postData);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(expected);
        done();
      });


    it("posts 'scheduledDays' value of 2", async done => {
        postData = elData.twoDays_2Hours;
        postData.scheduledDays = 2;
        const expected = { "cost": 80, "isValid": true };
        const res = await api.send(postData);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(expected);
        done();
      });


    it("posts 'scheduledDays' value of 3", async done => {
        postData = elData.threeDays_2Hours_group;
        postData.scheduledDays = 3;
        const baseCost = 3 * (3 * _2Hrs);
        const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);
        const expected = { "cost": withDiscount, "isValid": true };
        const res = await api.send(postData);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(expected);
        done();
      });


    it("posts 'scheduledDays' value of 12", async done => {
        postData = elData.monthly_2Hours_group;
        postData.scheduledDays = 12;
        const baseCost = 3 * (12 * _2Hrs);
        const withDiscount = Helpers.processDiscount(baseCost, _GroupDiscount);
        const expected = { "cost": withDiscount, "isValid": true };
        const res = await api.send(postData);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        console.log(expected);
        expect(res.body.data).toEqual(expected);
        done();
      });
  });

});