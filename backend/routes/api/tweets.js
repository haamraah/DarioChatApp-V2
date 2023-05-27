const express = require('express');
const { asyncHandler } = require('../../utils');

const router = express.Router();
const db = require('../../db/models');

const { Tweet } = db;

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll();
    res.json(tweets);
  })
);
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { message } = req.body;
    const tweet = await Tweet.create({ message });
    res.json(tweet);
  })
);
router.delete(
  '/:tweetID',
  asyncHandler(async (req, res) => {
    const tweetID = req.params.tweetID;
    console.log('delete route - tweetID', tweetID);

    const tweet = await Tweet.findByPk(tweetID);
    if (!tweet) {
      res.status(404).json({ message: 'Tweet not found' });
      return;
    }

    await tweet.destroy();
    console.log('delete route - tweet', tweet);

    res.json(tweet); // Send the deleted tweet as a response
  })
);
module.exports = router;
