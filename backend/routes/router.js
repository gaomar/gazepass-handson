const express  = require('express');
const router = express.Router();
const axios = require('axios');

// ログイン認証
router.post("/signIn", async (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  
  try {
    var resp = await axios.post(
      "https://api.gazepass.com/user/auth",
      {
          "api_key": process.env.VUE_APP_GAZEPASS_API_KEY,
          "api_secret": process.env.GAZEPASS_API_SECRET,
          "access_token": req.body.access_token
      })
    res.json(resp.data);
  } catch (error) {
    console.log(`signIn error =${error}`)
    res.statusCode = 500;
    res.json({error: error, url: req.url, body: req.body});  
  }
});

// OPTIONS
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.sendStatus(200);
});

module.exports = router;