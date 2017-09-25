const { Router } = require('express');
const { pageCtrl, taskCtrl } = require('../controllers');
const { protectRoute } = require('../controllers/auth.controller');

const router = Router();

router.get('/addtask', protectRoute, pageCtrl.goToAddTaskPage);
router.post('/addtask', protectRoute, taskCtrl.distributeTask);

router.get('/completed', protectRoute, pageCtrl.goToCompletedTaskPage);

module.exports = router;