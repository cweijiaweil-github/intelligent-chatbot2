var express = require('express');
var router = express.Router();
var comprehensiveCtrl = require('../controllers/comprehensive-ctrl');
var displayCtrl = require('../controllers/display-ctrl');

router.get('/', displayCtrl.showIndex);

router.post('/api/session/id', displayCtrl.getSessionID);

router.post('/api/history', displayCtrl.getHistory);

router.get('/api/history/csv', displayCtrl.outputHistory);

router.post('/api/chat', comprehensiveCtrl.getDialogue);

module.exports = router;
