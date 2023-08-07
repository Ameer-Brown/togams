const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Stakeholder Management System');
});

module.exports = router;
