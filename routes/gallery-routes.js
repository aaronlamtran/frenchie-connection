const router = require("express").Router();
const galleryControllers = require("../controllers/gallery-controller");
/*
 **
 **  .com/gallery/
 **
 */

router.delete('/:id', galleryControllers.removeFromGallery);
router.put("/:id", galleryControllers.deleteGalleryImages)
router.put("/update/:id", galleryControllers.updateGalleryImages)
router.get('/', galleryControllers.getOne);
router.post("/", galleryControllers.addToGallery);

// router.get("/gallery/:id", galleryControllers);

module.exports = router;
