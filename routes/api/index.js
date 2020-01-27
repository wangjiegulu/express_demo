let router = require("express").Router();

// router.use('/', require('./person'))
router.use('/p', require('./person'))
router.use('/f', require('./file'))
// ...

module.exports = router