const router = require("express").Router();
const galleryControllers = require("../controllers/gallery-controller");
/*
 **
 **  .com/gallery/
 **
 */
router.get('/', galleryControllers.getOne);
router.delete('/:id', galleryControllers.removeFromGallery);
router.post("/", galleryControllers.addToGallery);

// router.get("/gallery/:id", galleryControllers);

module.exports = router;
