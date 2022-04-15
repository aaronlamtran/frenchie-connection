const router = require("express").Router();
const dogControllers = require("../controllers/dog-waitlist-controller");

router.post("/create", dogControllers.createDog);

router.get("/all", dogControllers.allDogs);
router.get("/:id", dogControllers.singleDog);

module.exports = router;
