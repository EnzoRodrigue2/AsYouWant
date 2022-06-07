var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const usersController = require('../Controllers/users.controler')
const multer = require('multer');
const { path } = require('../../app');
// const path = require('path');
const pathh = require('path');
const userMiddleware = require('../middlewares/userMiddleware');

//validaciones
const validateRegisterForm = [
    body('nombre').notEmpty().withMessage('Debes colocar un nombre'),
    body('apellido').notEmpty().withMessage('Debes colocar un apellido'),
    body('email').isEmail().withMessage('Debes colocar un email de formato valido'),
    body('contraseña').isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')
];

const validateLoginForm = [
    body('nombre').notEmpty().withMessage('Debes colocar un nombre'),
    body('apellido').notEmpty().withMessage('Debes colocar un apellido'),
    body('email').isEmail().withMessage('Debes colocar un email de formato valido'),
];

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
router.get('/login', userMiddleware, usersController.login)
router.post('/login', usersController.cuenta)
router.get('/register', usersController.register)
router.post('/register', upload.single('imagen'), validateRegisterForm, usersController.store)
router.get('/perfil/:id', usersController.perfil)
router.get('/:id/editUser', usersController.edit)
// router.get('/list', usersController.list)
module.exports = router;
