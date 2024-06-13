
const URL = require('../models/Url');
const shortid = require('shortid');

exports.shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const urlCode = shortid.generate();
  const shortUrl = `${process.env.LOCAL_URL}/${urlCode}`;

  try {
    let url = await URL.findOne({ longUrl });

    if (url) {
      res.json(url);
    } else {
      url = new URL({
        longUrl,
        shortUrl,
        urlCode,
        createdBy: req.user.id,
      });

      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await URL.findOne({ urlCode: code });

    if (url) {
      // Increment clicks
      url.clicks++;
      await url.save();

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ message: 'No URL found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUrls = async (req, res) => {
  try {
    const urls = await URL.find({ createdBy: req.user.id });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
