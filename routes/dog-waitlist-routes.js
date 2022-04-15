const router = require("express").Router();
const dogControllers = require("../controllers/_________");

router.post("/create", _________.createDog);

router.get("/all", _________.allDogs);
router.get("/:id", _________.singleProduct);

module.exports = router;
