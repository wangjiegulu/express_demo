let router = require('express').Router()

router.use('/', require('./root'))

router.use('/api', require('./api'))

module.exports = router