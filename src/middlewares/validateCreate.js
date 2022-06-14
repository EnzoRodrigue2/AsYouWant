const {check} = require('express-validator');
let validateCreate = [
    check('titulo')
    .notEmpty().withMessage('El curso debe tener título')
    .isLength({ min: 5}).withMessage('El título debe tener al menos 5 caracteres'),
    check('description_corta')
    .notEmpty().withMessage('El curso debe tener descripción corta')
    .isLength({ min: 20}).withMessage('La descripción debe tener al menos 20 caracteres'),
    check('descripcion_larga')
    .notEmpty().withMessage('El curso debe tener una descripción más detallada')
    .isLength({ min: 50}).withMessage('La descripción detallada debe tener al menos 50 caracteres'),
    //check('categoria').notEmpty().withMessage('Se debe seleccionar una categoría'),
    check('precio')
    .notEmpty().withMessage('El curso debe tener un precio').bail().isInt().withMessage('El precio debe ser escrito en números')
];
module.exports = validateCreate