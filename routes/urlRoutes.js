const express = require('express');
const { shortenUrl, getUrl, getUrls } = require('../controllers/urlController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/shorten', protect, shortenUrl);
router.get('/:code', getUrl);
router.get('/', protect, getUrls);

module.exports = router;
