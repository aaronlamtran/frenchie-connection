const router = require("express").Router();
const WaitlistControllers = require("../controllers/_________");

router.post("/join/:id", _________.joinWaitlist);

router.get("/details", _________.getDetails);

module.exports = router;
