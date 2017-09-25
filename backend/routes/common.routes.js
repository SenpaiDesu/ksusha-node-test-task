const { Router } = require('express');
const { pageCtrl, authCtrl } = require('../controllers');

const router = Router();

router.get('/', pageCtrl.goToHomePage);
router.get('/signin', pageCtrl.goToSignInPage);
router.post('/signin', authCtrl.signIn);

module.exports = router;