const router = require('express').Router();
const userController = require('../controllers/userController');



router.post('/user/create',userController.createUser);
router.post('/user/add/comment/:userId',userController.createComment);
router.post('/user/add/reply/:id/:userId',userController.createReply);
router.get('/get/comments/:userId',userController.allCommentsByUser);
router.get('/get/replies/:commentId',userController.allRepliesByCommnet);
router.put('/update/comment/:commentId',userController.updateExistComment);
router.delete('/delete/comment/:commentId',userController.deleteComment);



module.exports = router