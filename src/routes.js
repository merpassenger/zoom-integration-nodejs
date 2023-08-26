const router = require('express').Router()

router.use('/zoom', require('./api/zoom'))

module.exports = router