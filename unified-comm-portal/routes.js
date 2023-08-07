const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Unified Comm Portal');
});

module.exports = router;
