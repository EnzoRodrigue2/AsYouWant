var express = require('express');
var router = express.Router();
const usersController = require('../Controllers/users.controler')
const multer = require('multer');
const { path } = require('../../app');
// const path = require('path');
const pathh = require('path'); 

const storage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,pathh.join(__dirname, '../../public/images/users'))
    },
    filename: (req,file,cb) => {
        const newFileName = 'user-'+ Date.now() + pathh.extname(file.originalname);
        cb(null, newFileName);
    }
})
const upload = multer({storage})

/* GET Formulario Login. */
router.get('/login', usersController.login)
router.get('/register', usersController.register)
router.post('/register', upload.single('imagen'), usersController.store)
router.get('/perfil/:id', usersController.perfil)
module.exports = router;
