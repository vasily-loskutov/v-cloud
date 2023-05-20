const express = require("express");
const FileController = require("../controllers/fileController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });


router.post('/save/:userId', authMiddleware, FileController.saveFile)
router.delete('/emptyTrash/:userId', authMiddleware, FileController.emptyTrash)
router.get('/download/:id', authMiddleware, FileController.downloadFile)
router.get('/:userId', FileController.getUserFiles)
router.get('/delete/:userId', FileController.getDeleteUserFiles)
module.exports = router;
