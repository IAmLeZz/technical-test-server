const express = require('express');
const { storeLaunchData, storeLandpadTypeData, storePayloadData, getLaunchData, getLandpadTypeData, getPayloadData, test } = require('../controllers/dataController');
const router = express.Router();

router.get('/store-launch-data', storeLaunchData);
router.get('/store-landpad-type-data', storeLandpadTypeData);
router.get('/store-payload-data', storePayloadData);
router.get('/get-launch-data', getLaunchData);
router.get('/get-landpad-type-data', getLandpadTypeData);
router.get('/get-payload-data', getPayloadData);
router.get('/test', test);

module.exports = router;