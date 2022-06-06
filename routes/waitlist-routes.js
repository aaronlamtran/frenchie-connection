const router = require("express").Router();
const WaitlistControllers = require("../controllers/waitlist-controller");
/*
 **
 **  .com/waitlist/
 **
 */
router.delete("/:id", WaitlistControllers.deleteWaitlistEntry);
router.post("/join/:id", WaitlistControllers.joinWaitlist);
router.get("/details", WaitlistControllers.getDetails);

module.exports = router;
