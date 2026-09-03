const router = require("express").Router();
const { uploadFile } = require("../controllers/uploadController");
const { upload } = require("../middleware/uploadMiddleware");

router.post("/", upload.single("file"), uploadFile);
router.post("/image", upload.single("file"), uploadFile);

module.exports = router;

