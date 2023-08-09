const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Music Management System');
});

module.exports = router;
