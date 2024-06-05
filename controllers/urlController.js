const Url = require('../models/Url');
const shortid = require('shortid');

exports.createShortUrl = async (req, res) => {
  const { longUrl } = req.body;

  try {
    const shortUrl = shortid.generate();
    const newUrl = new Url({ longUrl, shortUrl });

    await newUrl.save();

    res.send(newUrl);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.redirectShortUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await Url.findOne({ shortUrl });
    if (!url) return res.status(404).send('URL not found');

    url.clickCount++;
    await url.save();

    res.redirect(url.longUrl);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.send(urls);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
