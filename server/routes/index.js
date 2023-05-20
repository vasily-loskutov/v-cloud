const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.router"));
router.use('/file', require('./file.router'))
module.exports = router;
