const router = require('express').Router();
const carrosRouter = require('./carros');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/carros', carrosRouter);


module.exports = router;