const express = require('express');
const PricingCtrl = require('../controllers/pricing-ctrl');
const router = express.Router();


//generic scheduler
router.post('schedule', PricingCtrl.scheduler);


// // Could be used when Front End Calendar is added!
// // *some of these functions could process on the Front End instead
// router.post('/daily', PricingCtrl.addDay);
// router.post('/weekly', PricingCtrl.addWeek);
// router.post('/monthly', PricingCtrl.addMonth);


// //later enhancements
// router.post('/tattoo', PricingCtrl.buyTattoo);
// router.post('/mirror', PricingCtrl.buyMirror);


module.exports = router;