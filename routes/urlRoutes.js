const express = require('express');
const { createShortUrl, redirectShortUrl, getAllUrls } = require('../controllers/urlController');
const { authMiddleware } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/shorten', authMiddleware, createShortUrl);
router.get('/:shortUrl', redirectShortUrl);
router.get('/', authMiddleware, getAllUrls);

module.exports = router;
