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
    body('nombre')
        .notEmpty().withMessage('Debes colocar un nombre')
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes colocar un apellido')
        .isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes colocar un email')
        .isEmail().withMessage('El email debe ser válido'),
    body('contraseña')
        .notEmpty().withMessage('Debes colocar una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

const validateLoginForm = [
    body('nombre')
        .notEmpty().withMessage('Debes colocar un nombre')
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes colocar un email')
        .isEmail().withMessage('Debes colocar un email de formato valido'),
    body('contraseña')
        .notEmpty().withMessage('Debes colocar una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

const validateUpdateUser = [
    body('nombre')
        .notEmpty().withMessage('Debes colocar un nombre')
        .isLength({min: 2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('apellido')
        .notEmpty().withMessage('Debes colocar un apellido')
        .isLength({min: 2}).withMessage('El apellido debe tener al menos 2 caracteres'),
    body('email')
        .notEmpty().withMessage('Debes colocar un email')
        .isEmail().withMessage('El email debe ser válido'),
    body('contraseña')
        .notEmpty().withMessage('Debes colocar una contraseña')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
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

/* Formulario Login. */
router.get('/login', userMiddleware, usersController.login);
router.post('/login', validateLoginForm, usersController.cuenta);
/* Formulario register. */
router.get('/register', usersController.register);
router.post('/register', upload.single('imagen'), validateRegisterForm, usersController.store);
/* Perfil de usuario. */
router.get('/perfil/:id', usersController.perfil);
/* Editar usuario. */
router.get('/:id/editUser', usersController.editView);
router.put('/:id/editUser', validateUpdateUser, usersController.edit);
/*Probando API*/
router.get('/', usersController.list);
router.get('/:id', usersController.detail);
module.exports = router;
