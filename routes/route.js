const router = require('express').Router();
const userController = require('../controllers/userController');


router.post('/form',userController.createUserForm);
router.post('/fill_data',userController.createUser);
router.get('/get_data',userController.getUser);



module.exports = router