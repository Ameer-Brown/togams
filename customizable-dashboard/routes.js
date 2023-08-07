const express = require('express');
const router = express.Router();

// Define routes here, e.g.
router.get('/', (req, res) => {
  res.send('Unified Comm Portal');
});

module.exports = router;
