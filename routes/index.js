const {Router} = require('express');
const router = Router();
const {Home} = require('../controllers/homeController');
const {
    crearVacante,
    crearVacanteAction,
    verVacanteUrl,
    editarVacanteUrl,
    editarVacanteUrlAction,
    eliminarVacante,
    validarVacantes
} = require('../controllers/vacantesController');

const { 
    crearCuenta,
    validarRegistro,
    crearCuentaAction,
    iniciarSesion,
    editarPerfil,
    editarPerfilAction,
    validarEditar,
    subirImagen,
    iniciarSesionAction 
 } = require('../controllers/usuariosController');

 const { 
     authUsuario,
     panelDeAdmin, 
     verificarUsuario,
     cerrarSesion
    } = require('../controllers/authController');

router.get('/', Home);
router.get('/vacantes/nueva',verificarUsuario, crearVacante);    
router.post('/vacantes/nueva',verificarUsuario, validarVacantes, crearVacanteAction);

router.get('/vacantes/:url', verVacanteUrl);

router.get('/vacantes/editar/:url',verificarUsuario, editarVacanteUrl);
router.post('/vacantes/editar/:url',verificarUsuario, validarVacantes, editarVacanteUrlAction);

router.delete('/vacantes/eliminar/:id', verificarUsuario, eliminarVacante);

router.get('/crear-cuenta', crearCuenta);
router.post('/crear-cuenta', validarRegistro, crearCuentaAction);

router.get('/iniciar-sesion', iniciarSesion);
router.post('/iniciar-sesion',authUsuario)//,(req,res) =>{console.log(req.user);res.redirect('/')});

router.get('/cerrar-sesion', verificarUsuario, cerrarSesion)
//Panel admin
router.get('/admin',verificarUsuario, panelDeAdmin);

//Editar perfil
router.get('/editar-perfil',verificarUsuario, editarPerfil );
router.post('/editar-perfil', verificarUsuario, //validarEditar,
subirImagen,
 editarPerfilAction);
module.exports = router;