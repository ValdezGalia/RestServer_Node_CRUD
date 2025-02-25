const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/usuarios.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check("rol").custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check("password", "El password debe contener más de 6 letras").isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check("rol").custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;