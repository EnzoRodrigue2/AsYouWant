const {check} = require('express-validator');
let validateCreate = [
    check('titulo').notEmpty().withMessage('El curso debe tener título'),
    check('description_corta').notEmpty().withMessage('El curso debe tener descripción corta'),
    check('descripcion_larga').notEmpty().withMessage('El curso debe tener una descripción más detallada'),
    //check('categoria').notEmpty().withMessage('Se debe seleccionar una categoría'),
    check('precio').notEmpty().withMessage('El curso debe tener un precio').bail().isInt().withMessage('El precio debe ser escrito en números')
];
module.exports = validateCreate