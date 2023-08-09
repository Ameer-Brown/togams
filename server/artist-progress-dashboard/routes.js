const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Artist Progress Dashboard');
});

module.exports = router;
