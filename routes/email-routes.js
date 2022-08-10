const router = require("express").Router();
const emailControllers = require("../controllers/email-controller");
/*
 **
 **  .com/email/
 **
 */

router.get('/', emailControllers.pingEmailServer);

// router.get("/gallery/:id", galleryControllers);

module.exports = router;
