const router = require('express').Router()

const { sZoom } = require('../services')

router.post('/meeting/link',sZoom.getLinkService )

module.exports = router